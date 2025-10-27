import express from "express";
import pool from "../db.js";

const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  try {
    const { title, content, image_url } = req.body;
    if (!title || !content) return res.status(400).json({ error: "Campos obrigatórios ausentes" });

    const result = await pool.query(
      "INSERT INTO news (title, content, image_url) VALUES ($1, $2, $3) RETURNING *",
      [title, content, image_url]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Erro ao criar notícia:", err);
    res.status(500).json({ error: "Erro ao criar notícia" });
  }
});

// READ
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM news ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("Erro ao listar notícias:", err);
    res.status(500).json({ error: "Erro ao listar notícias" });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, image_url } = req.body;

    const result = await pool.query(
      "UPDATE news SET title=$1, content=$2, image_url=$3 WHERE id=$4 RETURNING *",
      [title, content, image_url, id]
    );

    if (result.rows.length === 0) return res.status(404).json({ error: "Notícia não encontrada" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Erro ao atualizar notícia:", err);
    res.status(500).json({ error: "Erro ao atualizar notícia" });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM news WHERE id=$1", [id]);
    res.json({ message: "Notícia removida com sucesso" });
  } catch (err) {
    console.error("Erro ao excluir notícia:", err);
    res.status(500).json({ error: "Erro ao excluir notícia" });
  }
});

export default router;
