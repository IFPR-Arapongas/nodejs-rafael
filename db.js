import 'dotenv/config';
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "cadastro",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

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


