import { PutCommand, ScanCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { v4 as uuidv4 } from 'uuid';
import { IRegistroRepository } from '../../domain/repositories/RegistroRepository';
import { Registro } from '../../domain/entities/Registro';
import { getDocClient } from './connection';

const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME || 'registrations';

export class RegistroRepositoryImpl implements IRegistroRepository {
  async save(registro: Registro): Promise<string> {
    const docClient = getDocClient();
    const id = uuidv4();

    const item = {
      id,
      ...registro,
      acceptedTerms: registro.acceptedTerms ? 1 : 0,
      createdAt: new Date().toISOString(),
    };

    await docClient.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: item,
      })
    );
    return id;
  }

  private mapItem(item: any): Registro {
    return {
      id: item.id,
      fullName: item.fullName,
      countryCode: item.countryCode,
      phone: item.phone,
      identificationNumber: item.identificationNumber,
      email: item.email,
      address: item.address,
      neighborhood: item.neighborhood,
      ageGroup: item.ageGroup,
      department: item.department,
      municipality: item.municipality,
      gender: item.gender,
      populationType: item.populationType,
      acceptedTerms: item.acceptedTerms === 1,
      referredById: item.referredById,
      createdAt: item.createdAt ? new Date(item.createdAt) : undefined,
    };
  }

  async findByIdentificationNumber(identificationNumber: string): Promise<Registro | null> {
    const docClient = getDocClient();
    const result = await docClient.send(
      new ScanCommand({
        TableName: TABLE_NAME,
        FilterExpression: 'identificationNumber = :id',
        ExpressionAttributeValues: { ':id': String(identificationNumber) },
      })
    );
    const item = (result.Items || [])[0];
    return item ? this.mapItem(item) : null;
  }

  async findByEmail(email: string): Promise<Registro | null> {
    const docClient = getDocClient();
    const result = await docClient.send(
      new ScanCommand({
        TableName: TABLE_NAME,
        FilterExpression: 'email = :email',
        ExpressionAttributeValues: { ':email': String(email) },
      })
    );
    const item = (result.Items || [])[0];
    return item ? this.mapItem(item) : null;
  }

  async findAll(): Promise<Registro[]> {
    const docClient = getDocClient();

    try {
      const result = await docClient.send(
        new ScanCommand({
          TableName: TABLE_NAME,
        })
      );

      return (result.Items || []).map((item: any) => this.mapItem(item));
    } catch (error) {
      throw error;
    }
  }

  async deleteAll(): Promise<void> {
    const docClient = getDocClient();

    try {
      const items = await docClient.send(
        new ScanCommand({
          TableName: TABLE_NAME,
          ProjectionExpression: 'id',
        })
      );

      if (items.Items && items.Items.length > 0) {
        for (const item of items.Items) {
          await docClient.send(
            new DeleteCommand({
              TableName: TABLE_NAME,
              Key: { id: item.id },
            })
          );
        }
      }
    } catch (error) {
      throw error;
    }
  }
}
