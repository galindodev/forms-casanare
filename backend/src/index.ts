import 'dotenv/config';
import express, { Request, Response } from 'express';
import { RegistroController } from './app/controllers/RegistroController';
import { RegistroService } from './app/services/RegistroService';
import { RegistroRepositoryImpl } from './infra/mysql/RegistroRepositoryImpl';
import { verifyBearerToken } from './app/middleware/auth';
import { getPool } from './infra/mysql/connection';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const registroRepository = new RegistroRepositoryImpl();
const registroService = new RegistroService(registroRepository);
const registroController = new RegistroController(registroService);

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK' });
});

app.post('/api/registros', verifyBearerToken, (req, res) => {
  registroController.crearRegistro(req, res);
});

app.get('/api/registros/excel', verifyBearerToken, (req, res) => {
  registroController.obtenerRegistrosExcel(req, res);
});

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

const startServer = async () => {
  try {
    const pool = await getPool();
    await pool.getConnection();
    console.log('✓ Connected to MySQL');

    app.listen(port, () => {
      console.log(`✓ Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
