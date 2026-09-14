import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

let docClient: DynamoDBDocumentClient | null = null;

export function getDocClient(): DynamoDBDocumentClient {
  if (!docClient) {
    const config: any = {
      region: 'us-east-1',
      endpoint: process.env.DYNAMODB_ENDPOINT,
    };

    // Local development with credentials
    if (process.env.DYNAMODB_ENDPOINT) {
      config.credentials = {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'local',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'local',
      };
    }
    // AWS Lambda uses IAM role automatically

    const dynamoDbClient = new DynamoDBClient(config);
    docClient = DynamoDBDocumentClient.from(dynamoDbClient);
  }
  return docClient;
}

export async function closeDocClient(): Promise<void> {
  if (docClient) {
    docClient.destroy();
    docClient = null;
  }
}
