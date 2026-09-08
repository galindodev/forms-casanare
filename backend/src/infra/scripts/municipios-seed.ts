import { Connection } from 'mysql2/promise';

const MUNICIPIOS_CASANARE = [
  'Aguazul',
  'Charte',
  'Hato Corozal',
  'La Salina',
  'Maní',
  'Monterrey',
  'Nunchía',
  'Orocué',
  'Paz de Ariporo',
  'Pore',
  'Recetor',
  'Sabanalarga',
  'Sácama',
  'San Luis de Palenque',
  'Támara',
  'Tauramena',
  'Trinidad',
  'Villanueva',
  'Yopal',
];

export async function insertMunicipios(connection: Connection): Promise<void> {
  try {
    for (const municipio of MUNICIPIOS_CASANARE) {
      try {
        await connection.execute(
          'INSERT IGNORE INTO municipios (nombre, departamento) VALUES (?, ?)',
          [municipio, 'Casanare']
        );
      } catch (error: any) {
        if (error.code !== 'ER_DUP_ENTRY') {
          throw error;
        }
      }
    }
  } catch (error) {
    console.error('Error inserting municipios:', error);
    throw error;
  }
}
