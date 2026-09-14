import 'reflect-metadata';
import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { setupContainer } from './infra/container/container';
import { swaggerSpec } from './infra/swagger/config';
import { DynamoDBClient, CreateTableCommand } from '@aws-sdk/client-dynamodb';
import healthRoutes from './app/routes/healthRoutes';
import registroRoutes from './app/routes/registroRoutes';

const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME || 'registrations';

async function ensureTable(): Promise<void> {
  const dynamoDbClient = new DynamoDBClient({
    region: 'us-east-1',
    endpoint: process.env.DYNAMODB_ENDPOINT,
  });

  try {
    await dynamoDbClient.send(
      new CreateTableCommand({
        TableName: TABLE_NAME,
        KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
        AttributeDefinitions: [
          { AttributeName: 'id', AttributeType: 'S' },
          { AttributeName: 'email', AttributeType: 'S' },
          { AttributeName: 'phone', AttributeType: 'S' },
          { AttributeName: 'identificationNumber', AttributeType: 'S' },
        ],
        BillingMode: 'PAY_PER_REQUEST',
        GlobalSecondaryIndexes: [
          {
            IndexName: 'email-index',
            KeySchema: [{ AttributeName: 'email', KeyType: 'HASH' }],
            Projection: { ProjectionType: 'ALL' },
          },
          {
            IndexName: 'phone-index',
            KeySchema: [{ AttributeName: 'phone', KeyType: 'HASH' }],
            Projection: { ProjectionType: 'ALL' },
          },
          {
            IndexName: 'identificationNumber-index',
            KeySchema: [{ AttributeName: 'identificationNumber', KeyType: 'HASH' }],
            Projection: { ProjectionType: 'ALL' },
          },
        ],
      })
    );
    console.log(`✓ Table ${TABLE_NAME} created`);
  } catch (error: any) {
    if (error.name === 'ResourceInUseException') {
      console.log(`✓ Table ${TABLE_NAME} exists`);
    } else {
      console.warn(`Table creation: ${error.message}`);
    }
  }
}

const app = express();
const port = process.env.PORT || 3000;

app.set('trust proxy', 1);
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
    console.log(`📌 Table: ${TABLE_NAME}\n`);

    await ensureTable();

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

