import { IRegistroRepository } from '../../domain/repositories/RegistroRepository';
import { Registro } from '../../domain/entities/Registro';
import { getPool } from './connection';

export class RegistroRepositoryImpl implements IRegistroRepository {
  async save(registro: Registro): Promise<number> {
    const pool = await getPool();
    const connection = await pool.getConnection();

    try {
      const [result] = await connection.execute(
        `INSERT INTO registros (
          fullName, phone, identificationType, identificationNumber,
          email, address, ageGroup, department,
          municipality, gender, acceptedTerms
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          registro.fullName,
          registro.phone,
          registro.identificationType,
          registro.identificationNumber,
          registro.email,
          registro.address,
          registro.ageGroup,
          registro.department,
          registro.municipality,
          registro.gender,
          registro.acceptedTerms ? 1 : 0,
        ]
      );

      return (result as any).insertId;
    } finally {
      connection.release();
    }
  }

  async findAll(): Promise<Registro[]> {
    const pool = await getPool();
    const connection = await pool.getConnection();

    try {
      const [rows] = await connection.execute('SELECT * FROM registros');
      return (rows as any[]).map((row) => ({
        id: row.id,
        fullName: row.fullName,
        phone: row.phone,
        identificationType: row.identificationType,
        identificationNumber: row.identificationNumber,
        email: row.email,
        address: row.address,
        ageGroup: row.ageGroup,
        department: row.department,
        municipality: row.municipality,
        gender: row.gender,
        acceptedTerms: row.acceptedTerms === 1,
        createdAt: row.createdAt,
      }));
    } finally {
      connection.release();
    }
  }

  async deleteAll(): Promise<void> {
    const pool = await getPool();
    const connection = await pool.getConnection();

    try {
      await connection.execute('DELETE FROM registros');
    } finally {
      connection.release();
    }
  }
}
