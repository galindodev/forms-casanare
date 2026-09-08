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
          nombresCompletos, celular, tipoIdentificacion, numeroIdentificacion,
          correoElectronico, direccionCompleta, grupoEdad, departamento,
          municipio, genero, aceptoTerminos
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          registro.nombresCompletos,
          registro.celular,
          registro.tipoIdentificacion,
          registro.numeroIdentificacion,
          registro.correoElectronico,
          registro.direccionCompleta,
          registro.grupoEdad,
          registro.departamento,
          registro.municipio,
          registro.genero,
          registro.aceptoTerminos ? 1 : 0,
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
        nombresCompletos: row.nombresCompletos,
        celular: row.celular,
        tipoIdentificacion: row.tipoIdentificacion,
        numeroIdentificacion: row.numeroIdentificacion,
        correoElectronico: row.correoElectronico,
        direccionCompleta: row.direccionCompleta,
        grupoEdad: row.grupoEdad,
        departamento: row.departamento,
        municipio: row.municipio,
        genero: row.genero,
        aceptoTerminos: row.aceptoTerminos === 1,
        fechaRegistro: row.fechaRegistro,
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
