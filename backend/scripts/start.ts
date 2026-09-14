import 'dotenv/config';
import { DynamoDBClient, ListTablesCommand, CreateTableCommand } from '@aws-sdk/client-dynamodb';

const dynamoDbClient = new DynamoDBClient({
  region: process.env.AWS_REGION || 'us-east-1',
  endpoint: process.env.DYNAMODB_ENDPOINT,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'local',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'local',
  },
});

const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME || 'registrations';

async function ensureTable(): Promise<void> {
  try {
    console.log(`Checking if table ${TABLE_NAME} exists...`);

    const listResult = await dynamoDbClient.send(new ListTablesCommand({}));
    const tableExists = listResult.TableNames?.includes(TABLE_NAME);

    if (tableExists) {
      console.log(`✓ Table ${TABLE_NAME} already exists`);
      return;
    }

    console.log(`Creating table ${TABLE_NAME}...`);
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

    console.log(`✓ Table ${TABLE_NAME} created successfully`);
  } catch (error: any) {
    console.error('Error ensuring table:', error.message);
    process.exit(1);
  }
}

async function start(): Promise<void> {
  try {
    await ensureTable();
    console.log('\n✓ Database ready\n');

    console.log('🚀 Starting server...\n');
    require('./dist/index.js');
  } catch (error) {
    console.error('Fatal error during startup:', error);
    process.exit(1);
  }
}

start();
