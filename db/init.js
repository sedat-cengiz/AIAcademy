const initSqlJs = require('sql.js');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');

const DB_PATH = process.env.VERCEL
  ? path.join('/tmp', 'academy.sqlite')
  : path.join(__dirname, 'academy.sqlite');
let _db = null;
let _ready = null;

function initDb() {
  if (_ready) return _ready;
  const wasmPath = path.join(__dirname, '..', 'node_modules', 'sql.js', 'dist', 'sql-wasm.wasm');
  const wasmBinary = fs.readFileSync(wasmPath);
  _ready = initSqlJs({ wasmBinary }).then(SQL => {
    let data = null;
    if (fs.existsSync(DB_PATH)) {
      data = fs.readFileSync(DB_PATH);
    }
    _db = data ? new SQL.Database(data) : new SQL.Database();
    bootstrap(_db);
    persist();
    return _db;
  });
  return _ready;
}

function getDb() {
  if (!_db) throw new Error('Database not initialized. Call await initDb() first.');
  return _db;
}

function persist() {
  if (!_db) return;
  const data = _db.export();
  const buf = Buffer.from(data);
  fs.writeFileSync(DB_PATH, buf);
}

function run(sql, params) {
  _db.run(sql, params);
  persist();
}

function get(sql, params) {
  const stmt = _db.prepare(sql);
  if (params) stmt.bind(params);
  if (stmt.step()) {
    const cols = stmt.getColumnNames();
    const vals = stmt.get();
    stmt.free();
    const row = {};
    cols.forEach((c, i) => { row[c] = vals[i]; });
    return row;
  }
  stmt.free();
  return undefined;
}

function all(sql, params) {
  const stmt = _db.prepare(sql);
  if (params) stmt.bind(params);
  const results = [];
  const cols = stmt.getColumnNames();
  while (stmt.step()) {
    const vals = stmt.get();
    const row = {};
    cols.forEach((c, i) => { row[c] = vals[i]; });
    results.push(row);
  }
  stmt.free();
  return results;
}

function bootstrap(db) {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT DEFAULT '',
      name TEXT NOT NULL,
      role TEXT DEFAULT 'general',
      plan TEXT DEFAULT 'free',
      credits INTEGER DEFAULT 50,
      monthly_credits INTEGER DEFAULT 50,
      company_id INTEGER,
      is_admin INTEGER DEFAULT 0,
      completed_courses TEXT DEFAULT '[]',
      completed_challenges TEXT DEFAULT '[]',
      points INTEGER DEFAULT 0,
      quiz_results TEXT DEFAULT '{}',
      google_id TEXT,
      google_access_token TEXT,
      google_refresh_token TEXT,
      google_token_expiry TEXT,
      avatar_url TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      last_login TEXT
    )
  `);

  // Migrate existing databases: add Google columns if missing
  const migrations = [
    'ALTER TABLE users ADD COLUMN google_id TEXT',
    'ALTER TABLE users ADD COLUMN google_access_token TEXT',
    'ALTER TABLE users ADD COLUMN google_refresh_token TEXT',
    'ALTER TABLE users ADD COLUMN google_token_expiry TEXT',
    'ALTER TABLE users ADD COLUMN avatar_url TEXT',
  ];
  for (const m of migrations) {
    try { db.run(m); } catch { /* column already exists */ }
  }

  db.run(`CREATE TABLE IF NOT EXISTS companies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    logo_url TEXT,
    primary_color TEXT DEFAULT '#4f46e5',
    max_users INTEGER DEFAULT 50,
    plan TEXT DEFAULT 'enterprise',
    kvkk_mode INTEGER DEFAULT 1,
    sso_provider TEXT,
    sso_config TEXT,
    custom_domain TEXT,
    billing_email TEXT,
    contact_person TEXT,
    contract_start TEXT,
    contract_end TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  )`);

  const companyMigrations = [
    'ALTER TABLE companies ADD COLUMN kvkk_mode INTEGER DEFAULT 1',
    'ALTER TABLE companies ADD COLUMN sso_provider TEXT',
    'ALTER TABLE companies ADD COLUMN sso_config TEXT',
    'ALTER TABLE companies ADD COLUMN custom_domain TEXT',
    'ALTER TABLE companies ADD COLUMN billing_email TEXT',
    'ALTER TABLE companies ADD COLUMN contact_person TEXT',
    'ALTER TABLE companies ADD COLUMN contract_start TEXT',
    'ALTER TABLE companies ADD COLUMN contract_end TEXT',
  ];
  for (const m of companyMigrations) {
    try { db.run(m); } catch { /* column already exists */ }
  }

  db.run(`CREATE TABLE IF NOT EXISTS conversations (
    id TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    title TEXT DEFAULT 'Yeni Sohbet',
    system_prompt TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS chat_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    conversation_id TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    role TEXT NOT NULL,
    content TEXT NOT NULL,
    tokens_used INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now'))
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS tool_usage (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    tool_name TEXT NOT NULL,
    tokens_used INTEGER DEFAULT 0,
    credits_used INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now'))
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS prompts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    price INTEGER DEFAULT 0,
    is_featured INTEGER DEFAULT 0,
    rating_sum REAL DEFAULT 0,
    rating_count INTEGER DEFAULT 0,
    usage_count INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now'))
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS prompt_ratings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    prompt_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    rating INTEGER NOT NULL,
    comment TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS prompt_purchases (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    prompt_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    price_paid INTEGER NOT NULL,
    created_at TEXT DEFAULT (datetime('now'))
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS certificates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    level TEXT NOT NULL,
    score INTEGER NOT NULL,
    certificate_code TEXT UNIQUE NOT NULL,
    is_verified INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now'))
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS credit_transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    amount INTEGER NOT NULL,
    type TEXT NOT NULL,
    description TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  )`);

  const admin = get("SELECT id FROM users WHERE email = ?", ['admin@aiacademy.local']);
  if (!admin) {
    const hash = bcrypt.hashSync('admin123', 10);
    db.run(
      "INSERT INTO users (email, password_hash, name, role, plan, credits, monthly_credits, is_admin) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      ['admin@aiacademy.local', hash, 'Admin', 'technical', 'enterprise', 99999, 99999, 1]
    );
  }
}

module.exports = { initDb, getDb, run, get, all, persist };
