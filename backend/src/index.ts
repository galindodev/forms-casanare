import 'reflect-metadata';
import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { setupContainer } from './infra/container/container';
import { swaggerSpec } from './infra/swagger/config';
import healthRoutes from './app/routes/healthRoutes';
import registroRoutes from './app/routes/registroRoutes';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
  })
);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

setupContainer();

app.use('/health', healthRoutes);
app.use('/api/registrations', registroRoutes);

app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

const startServer = async () => {
  try {
    console.log('\n🎯 Starting Defensores de la Patria API...\n');
    console.log(`📌 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`📌 CORS Origin: ${process.env.CORS_ORIGIN || '*'}`);
    console.log(`📌 DynamoDB: ${process.env.DYNAMODB_ENDPOINT || 'AWS'}`);
    console.log(`📌 Table: ${process.env.DYNAMODB_TABLE_NAME || 'registrations'}\n`);

    app.listen(port, () => {
      console.log(`✓ Server running on http://localhost:${port}`);
      console.log(`✓ API Docs: http://localhost:${port}/api-docs`);
      console.log(`✓ Health: http://localhost:${port}/health\n`);
    });
  } catch (error) {
    console.error('\n❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
