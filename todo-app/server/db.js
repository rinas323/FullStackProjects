const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DBSOURCE = path.join(__dirname, 'todos.db');

const db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error('❌ Could not connect to SQLite database', err);
    process.exit(1);
  } else {
    console.log('✅ Connected to SQLite database');
  }
});

// ===== USERS TABLE =====
db.run(
  `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`,
  (err) => {
    if (err) console.error('❌ Failed to create users table', err);
    else console.log('✅ Users table ready');
  }
);

// ===== TODOS TABLE =====
db.run(
  `CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    completed INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )`,
  (err) => {
    if (err) console.error('❌ Failed to create todos table', err);
    else console.log('✅ Todos table ready');
  }
);

module.exports = db;

