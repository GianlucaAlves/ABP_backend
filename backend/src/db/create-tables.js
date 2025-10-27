import pool from "../db.js";

async function createTables() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'member', -- admin | member
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✅ Tabela 'users' criada com sucesso!");
  } catch (err) {
    console.error("❌ Erro ao criar tabela:", err);
  } finally {
    await pool.end();
  }
}

createTables();