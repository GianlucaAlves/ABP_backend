import express from "express";
import db from "../db.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Rota protegida — acessível apenas com token válido
router.get("/", verifyToken, async (req, res) => {
  try {
    const result = await db.query("SELECT id, name, email, role FROM users WHERE id = $1", [req.userId]);
    const user = result.rows[0];
    res.json(user);
  } catch (error) {
    console.error("Erro ao carregar dados do dashboard:", error);
    res.status(500).json({ error: "Erro no servidor" });
  }
});

export default router;