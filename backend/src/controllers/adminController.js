import bcrypt from "bcrypt";
import db from "../db.js";

// Criar novo usuário
export async function createUser(req, res) {
  try {
    const { name, email, password, role } = req.body;

    // Verifica se quem está criando é admin
    const userResult = await db.query("SELECT role FROM users WHERE id = $1", [req.userId]);
    if (userResult.rows[0].role !== "admin") {
      return res.status(403).json({ error: "Acesso negado." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)",
      [name, email, hashedPassword, role]
    );

    res.json({ message: "Usuário criado com sucesso!" });
  } catch (err) {
    console.error("Erro ao criar usuário:", err);
    res.status(500).json({ error: "Erro no servidor" });
  }
}

// Listar todos os usuários
export async function listUsers(req, res) {
  try {
    const userResult = await db.query("SELECT role FROM users WHERE id = $1", [req.userId]);
    if (userResult.rows[0].role !== "admin") {
      return res.status(403).json({ error: "Acesso negado." });
    }

    const result = await db.query("SELECT id, name, email, role, created_at FROM users ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error("Erro ao listar usuários:", err);
    res.status(500).json({ error: "Erro no servidor" });
  }
}

// Deletar usuário
export async function deleteUser(req, res) {
  try {
    const userResult = await db.query("SELECT role FROM users WHERE id = $1", [req.userId]);
    if (userResult.rows[0].role !== "admin") {
      return res.status(403).json({ error: "Acesso negado." });
    }

    const { id } = req.params;
    await db.query("DELETE FROM users WHERE id = $1", [id]);
    res.json({ message: "Usuário removido com sucesso!" });
  } catch (err) {
    console.error("Erro ao deletar usuário:", err);
    res.status(500).json({ error: "Erro no servidor" });
  }
}