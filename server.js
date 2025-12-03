import express from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

import clientesRouter from './routes/clients.routes.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

app.use('/clientes', autenticarToken, clientesRouter);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

function autenticarToken(req, res, next) {
  const token = req.cookies['authToken'];

  if (!token)
    return res.status(401).send({ auth: false, mensagem: 'Nenhum token informado' })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.email = decoded.email;
    next();
  } catch (err) {
    return res.status(401).send({
      auth: false,
      mensagem: 'Token inválido ou expirado.'
    });
  }
}

app.post('/login', async (req, res) => {
  let { email, senha } = req.body;

  if (email != 'rafael.rodrigues@gmail.com' || senha !== '123456') {
    return res.status(401).send({
      auth: false,
      mensagem: 'Usuário ou senha inválidos'
    })
  }

  let token = jwt.sign(
    { email: email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  res.cookie('authToken', token, {
    httpOnly: true, 
    maxAge: 24 * 3600000, 
    sameSite: 'Lax'
  });
  res.status(200).send({ auth: true, message: 'Login realizado com sucesso' })
})