import pool from "../db.js";
import bcrypt from "bcrypt";

async function seedUser() {
  try {
    const name = "Administrador";
    const email = "admin@example.com";
    const password = "123456"; // senha padrão
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO users (name, email, password, role)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (email) DO NOTHING;
    `;

    await pool.query(query, [name, email, hashedPassword, "admin"]);

    console.log("✅ Usuário admin inserido com sucesso!");
    console.log(`Login: ${email}`);
    console.log(`Senha: ${password}`);
  } catch (err) {
    console.error("❌ Erro ao inserir usuário:", err);
  } finally {
    await pool.end();
  }
}

seedUser();