const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./aerofix.db");

db.serialize(() => {
    db.run(`
    CREATE TABLE IF NOT EXISTS drones (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      modelo TEXT NOT NULL,
      problema TEXT NOT NULL,
      status TEXT NOT NULL,
      data_entrada TEXT NOT NULL,
      foto_url TEXT
    )
  `);
});

module.exports = db;
