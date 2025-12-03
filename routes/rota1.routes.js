import { Router } from 'express';
import { getClientes } from '../db.js';

const router = Router();

router.get('/', async (req, res) => {
  const clientes = await getClientes();
  res.status(200).json(clientes);
});

export default router;