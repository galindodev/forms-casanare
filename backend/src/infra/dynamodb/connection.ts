import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

let docClient: DynamoDBDocumentClient | null = null;

export function getDocClient(): DynamoDBDocumentClient {
  if (!docClient) {
    const dynamoDbClient = new DynamoDBClient({
      region: process.env.AWS_REGION || 'us-east-1',
      endpoint: process.env.DYNAMODB_ENDPOINT,
      credentials: process.env.DYNAMODB_ENDPOINT
        ? {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'local',
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'local',
          }
        : undefined,
    });

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
