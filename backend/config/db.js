import mysql from 'promise-mysql';
import config from './config.js';

let pool;

export async function getPool() {
  if (!pool) {
    try {
      pool = await mysql.createPool({
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database,
      });
      console.log('Conexión a la base de datos establecida');
    } catch (error) {
      console.error('Error al conectar a la base de datos:', error.message);
      throw error;
    }
  }
  return pool;
}
