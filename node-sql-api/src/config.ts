import { config } from 'mssql';
import { env } from 'process';

export const serverPort = env.PORT || '8080';
export const dbConfig: config = {
  server: 'localhost',
  user: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: 'DemoData',
  port: 1433,
  parseJSON: true,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    trustedConnection: true,
    trustServerCertificate: true,
    useUTC: true,
  },
};

console.log('dbConfig:', dbConfig, serverPort);
