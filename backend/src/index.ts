import 'dotenv/config';
import express, { Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import { RegistroController } from './app/controllers/RegistroController';
import { RegistroService } from './app/services/RegistroService';
import { RegistroRepositoryImpl } from './infra/mysql/RegistroRepositoryImpl';
import { verifyBearerToken } from './app/middleware/auth';
import { getPool } from './infra/mysql/connection';
import { swaggerSpec } from './infra/swagger/config';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const registroRepository = new RegistroRepositoryImpl();
const registroService = new RegistroService(registroRepository);
const registroController = new RegistroController(registroService);

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: Server is running
 */
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK' });
});

/**
 * @swagger
 * /api/registrations:
 *   post:
 *     summary: Create a new registration
 *     tags:
 *       - Registrations
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               phone:
 *                 type: string
 *               identificationType:
 *                 type: string
 *               identificationNumber:
 *                 type: string
 *               email:
 *                 type: string
 *               address:
 *                 type: string
 *               ageGroup:
 *                 type: string
 *               department:
 *                 type: string
 *               municipality:
 *                 type: string
 *               gender:
 *                 type: string
 *                 enum: [Male, Female]
 *               acceptedTerms:
 *                 type: boolean
 *             required:
 *               - fullName
 *               - phone
 *               - email
 *               - identificationNumber
 *               - municipality
 *               - acceptedTerms
 *     responses:
 *       201:
 *         description: Registration created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Invalid token
 */
app.post('/api/registrations', verifyBearerToken, (req, res) => {
  registroController.createRegistration(req, res);
});

/**
 * @swagger
 * /api/registrations/excel:
 *   get:
 *     summary: Download registrations as Excel file
 *     tags:
 *       - Registrations
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Excel file with registrations
 *         content:
 *           application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:
 *             schema:
 *               type: string
 *               format: binary
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Invalid token
 */
app.get('/api/registrations/excel', verifyBearerToken, (req, res) => {
  registroController.getRegistrationsExcel(req, res);
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
