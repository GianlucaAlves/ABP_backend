// routes/adminRoutes.js
import express from "express";
import bcrypt from "bcrypt";
import db from "../db.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { createUser, listUsers, deleteUser } from "../controllers/adminController.js";

const router = express.Router();

router.post("/create-user", verifyToken, async (req, res) => {
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
});

router.post("/create", verifyToken, createUser);
router.get("/list", verifyToken, listUsers);
router.delete("/delete/:id", verifyToken, deleteUser);

export default router;