import 'dotenv/config';
import mysql from 'mysql2/promise';

const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "cadastro",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;

export async function getClientes() {
  const [rows] = await pool.query('SELECT * FROM cliente');
  return rows;
}

export async function getClientById(id) {
  const [rows] = await pool.execute('SELECT * FROM cliente WHERE id = ?', [id]);
  console.log(rows);
  return rows;
}

export async function createClient(nome, email, cpf, data_nascimento, senha) {
  const [result] = await pool.execute(
    'INSERT INTO cliente (nome, email, cpf, data_nascimento) VALUES (?, ?, ?, ?)',
    [nome, email, cpf, data_nascimento, senha]
  );
  return result.insertId;
}

//
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Caminho do banco
const dbPath = path.resolve(__dirname, 'banco.sql');

// Conexão com SQLite
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Erro ao conectar ao banco:", err.message);
  } else {
    console.log("Conectado ao banco SQLite.");
  }
});

// Criar tabela clientes (se não existir)
db.serialize(() => {
  db.run(`
        CREATE TABLE IF NOT EXISTS clientes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            telefone TEXT,
            criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `);
});

module.exports = db;

