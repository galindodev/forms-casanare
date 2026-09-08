import 'dotenv/config';
import { getPool, closePool } from '../mysql/connection';
import { insertMunicipios } from './municipios-seed';

async function initializeDatabase() {
  try {
    const pool = await getPool();
    const connection = await pool.getConnection();

    console.log('Creating registrations table...');
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS registrations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        fullName VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL UNIQUE,
        identificationType VARCHAR(50) NOT NULL,
        identificationNumber VARCHAR(50) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL UNIQUE,
        address TEXT NOT NULL,
        ageGroup VARCHAR(50) NOT NULL,
        department VARCHAR(100) NOT NULL,
        municipality VARCHAR(100) NOT NULL,
        gender ENUM('Male', 'Female') NOT NULL,
        acceptedTerms BOOLEAN NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_municipality (municipality),
        INDEX idx_createdAt (createdAt)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✓ registrations table created/verified');

    console.log('Creating municipalities table...');
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS municipalities (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE,
        department VARCHAR(100) NOT NULL DEFAULT 'Casanare',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✓ municipalities table created/verified');

    console.log('Seeding municipalities...');
    await insertMunicipios(connection);
    console.log('✓ municipalities seeded');

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
