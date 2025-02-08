import 'dotenv/config';

export const {
  PORT = 3000,
  BASE_URL = 'http://localhost:3000',
  TURSO_DATABASE_URL,
  TURSO_AUTH_TOKEN
} = process.env;
