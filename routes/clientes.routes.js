const express = require("express");
const router = express.Router();
const pool = require("../db");

// ➤ Buscar todos os clientes
router.get("/", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM clientes");
        res.json(rows);
    } catch (err) {
        res.status(500).send("Erro ao buscar clientes");
    }
});

// ➤ Criar novo cliente
router.post("/", async (req, res) => {
    const { nome, email, telefone } = req.body;

    if (!nome || !email) {
        return res.status(400).json({ erro: "Nome e email são obrigatórios" });
    }

    try {
        const sql = "INSERT INTO clientes (nome, email, telefone) VALUES (?, ?, ?)";
        const params = [nome, email, telefone];

        const [result] = await pool.query(sql, params);
        res.json({ id: result.insertId, nome, email, telefone });
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao cadastrar cliente");
    }
});

// ➤ Buscar se precisar mais tarde
router.get("/:id", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM clientes WHERE id = ?", [
            req.params.id,
        ]);

        if (rows.length === 0) {
            return res.status(404).send("Cliente não encontrado");
        }

        res.json(rows[0]);
    } catch (err) {
        res.status(500).send("Erro ao buscar cliente");
    }
});

module.exports = router;
