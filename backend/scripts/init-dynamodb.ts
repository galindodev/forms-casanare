import 'dotenv/config';
import { CreateTableCommand, DynamoDBClient } from '@aws-sdk/client-dynamodb';

const dynamoDbClient = new DynamoDBClient({
  region: process.env.AWS_REGION || 'us-east-1',
  endpoint: process.env.DYNAMODB_ENDPOINT,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'local',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'local',
  },
});

const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME || 'registrations';

async function initializeTable(): Promise<void> {
  try {
    console.log(`\n📊 Initializing DynamoDB...`);
    console.log(`   Endpoint: ${process.env.DYNAMODB_ENDPOINT}`);
    console.log(`   Table: ${TABLE_NAME}\n`);

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

    console.log(`✓ Table ${TABLE_NAME} created successfully\n`);
  } catch (error: any) {
    if (error.name === 'ResourceInUseException') {
      console.log(`✓ Table ${TABLE_NAME} already exists\n`);
    } else {
      console.error('❌ Error creating table:', error.message);
      console.error('   Check DynamoDB is running: docker-compose up\n');
      process.exit(1);
    }
  }
}

console.log('\n🚀 Starting initialization...\n');
initializeTable();
