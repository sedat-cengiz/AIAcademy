const { Router } = require('express');
const { get, run } = require('../db/init');
const { authRequired } = require('./middleware');
const creditsModule = require('./credits');

const router = Router();

function getStripeClient() {
  const secret = (process.env.STRIPE_SECRET_KEY || '').trim();
  if (!secret || secret === 'sk_test_placeholder') return null;
  // Lazy require so that dev environments without Stripe still çalışır
  // eslint-disable-next-line global-require
  const Stripe = require('stripe');
  return new Stripe(secret, { apiVersion: '2023-10-16' });
}

function getAppBaseUrl() {
  const explicit = (process.env.APP_URL || '').trim();
  if (explicit) return explicit.replace(/\/$/, '');
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL.replace(/\/$/, '')}`;
  const port = process.env.PORT || 3000;
  return `http://localhost:${port}`;
}

router.post('/create-checkout-session', authRequired, async (req, res) => {
  const stripe = getStripeClient();
  const priceId = (process.env.STRIPE_PRICE_PRO_MONTHLY || '').trim();
  if (!stripe || !priceId) {
    return res.status(500).json({ error: 'Stripe yapılandırılmamış. Lütfen STRIPE_SECRET_KEY ve STRIPE_PRICE_PRO_MONTHLY değişkenlerini ayarlayın.' });
  }

  const appUrl = getAppBaseUrl();

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer_email: req.user.email,
      metadata: {
        userId: String(req.user.id),
        plan: 'pro',
      },
      success_url: `${appUrl}/?billing_success=1&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/?billing_cancel=1`,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error('Stripe checkout error:', err);
    res.status(500).json({ error: 'Ödeme oturumu oluşturulamadı.', detail: err.message });
  }
});

router.post('/confirm', authRequired, async (req, res) => {
  const stripe = getStripeClient();
  const { sessionId } = req.body || {};
  if (!stripe) {
    return res.status(500).json({ error: 'Stripe yapılandırılmamış.' });
  }
  if (!sessionId) {
    return res.status(400).json({ error: 'sessionId zorunludur.' });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (!session) return res.status(404).json({ error: 'Oturum bulunamadı.' });

    if (session.payment_status !== 'paid') {
      return res.status(400).json({ error: 'Ödeme henüz tamamlanmamış görünüyor.' });
    }

    const metaUserId = session.metadata?.userId ? Number(session.metadata.userId) : null;
    if (metaUserId && metaUserId !== req.user.id) {
      return res.status(403).json({ error: 'Bu ödeme oturumu farklı bir kullanıcıya ait.' });
    }

    // Eğer kullanıcı zaten Pro ise idempotent davran
    if (req.user.plan === 'pro') {
      return res.json({ ok: true, plan: 'pro', credits: req.user.credits, alreadyUpgraded: true });
    }

    const { PLANS } = creditsModule;
    const proPlan = PLANS.pro;
    const creditsToAdd = proPlan.monthlyCredits;

    run(
      'UPDATE users SET plan = ?, monthly_credits = ?, credits = credits + ? WHERE id = ?',
      ['pro', creditsToAdd, creditsToAdd, req.user.id]
    );

    // Güncel kredi bilgisini tekrar oku
    const updated = get('SELECT credits FROM users WHERE id = ?', [req.user.id]);

    res.json({ ok: true, plan: 'pro', credits: updated.credits });
  } catch (err) {
    console.error('Stripe confirm error:', err);
    res.status(500).json({ error: 'Ödeme durumu doğrulanamadı.', detail: err.message });
  }
});

module.exports = router;

