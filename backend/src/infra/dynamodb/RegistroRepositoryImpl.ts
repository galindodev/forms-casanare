import { PutCommand, ScanCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { v4 as uuidv4 } from 'uuid';
import { IRegistroRepository } from '../../domain/repositories/RegistroRepository';
import { Registro } from '../../domain/entities/Registro';
import { getDocClient } from './connection';

const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME || 'registrations';

export class RegistroRepositoryImpl implements IRegistroRepository {
  async save(registro: Registro): Promise<number> {
    const docClient = getDocClient();
    const id = uuidv4();

    const item = {
      id,
      ...registro,
      acceptedTerms: registro.acceptedTerms ? 1 : 0,
      createdAt: new Date().toISOString(),
    };

    try {
      await docClient.send(
        new PutCommand({
          TableName: TABLE_NAME,
          Item: item,
          ConditionExpression:
            'attribute_not_exists(email) AND attribute_not_exists(identificationNumber)',
        })
      );
      return parseInt(id.split('-')[0], 16);
    } catch (error: any) {
      if (error.name === 'ConditionalCheckFailedException') {
        throw new Error('Email or identification number already registered');
      }
      throw error;
    }
  }

  async findAll(): Promise<Registro[]> {
    const docClient = getDocClient();

    try {
      const result = await docClient.send(
        new ScanCommand({
          TableName: TABLE_NAME,
        })
      );

      return (result.Items || []).map((item: any) => ({
        id: item.id,
        fullName: item.fullName,
        countryCode: item.countryCode,
        phone: item.phone,
        identificationType: item.identificationType,
        identificationNumber: item.identificationNumber,
        email: item.email,
        address: item.address,
        ageGroup: item.ageGroup,
        department: item.department,
        municipality: item.municipality,
        gender: item.gender,
        acceptedTerms: item.acceptedTerms === 1,
        referredById: item.referredById,
        createdAt: item.createdAt ? new Date(item.createdAt) : undefined,
      }));
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
