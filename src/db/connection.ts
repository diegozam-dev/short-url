import { createClient } from '@libsql/client';
// import { TURSO_AUTH_TOKEN, TURSO_DATABASE_URL } from '../config';

export const db = createClient({
  url: 'http://127.0.0.1:8080'
  // authToken: TURSO_AUTH_TOKEN
});
