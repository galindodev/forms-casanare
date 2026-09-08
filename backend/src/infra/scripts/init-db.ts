import { getPool, closePool } from '../mysql/connection';
import { insertMunicipios } from './municipios-seed';

async function initializeDatabase() {
  try {
    const pool = await getPool();
    const connection = await pool.getConnection();

    console.log('Creating registros table...');
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS registros (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombresCompletos VARCHAR(255) NOT NULL,
        celular VARCHAR(20) NOT NULL,
        tipoIdentificacion VARCHAR(50) NOT NULL,
        numeroIdentificacion VARCHAR(50) NOT NULL UNIQUE,
        correoElectronico VARCHAR(255) NOT NULL,
        direccionCompleta TEXT NOT NULL,
        grupoEdad VARCHAR(50) NOT NULL,
        departamento VARCHAR(100) NOT NULL,
        municipio VARCHAR(100) NOT NULL,
        genero ENUM('Hombre', 'Mujer') NOT NULL,
        aceptoTerminos BOOLEAN NOT NULL,
        fechaRegistro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_municipio (municipio),
        INDEX idx_fechaRegistro (fechaRegistro)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✓ registros table created/verified');

    console.log('Creating municipios table...');
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS municipios (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL UNIQUE,
        departamento VARCHAR(100) NOT NULL DEFAULT 'Casanare',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✓ municipios table created/verified');

    console.log('Seeding municipios...');
    await insertMunicipios(connection);
    console.log('✓ municipios seeded');

    connection.release();
    await closePool();
    console.log('✓ Database initialization complete');
    process.exit(0);
  } catch (error) {
    console.error('Database initialization failed:', error);
    process.exit(1);
  }
}

initializeDatabase();
