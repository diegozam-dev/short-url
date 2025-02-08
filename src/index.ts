import express, { json } from 'express';
import cors from 'cors';
import router from './routes/index';
import { PORT } from './config';
import { db } from './db/connection';

const app = express();

app.use(json());
app.use(cors());
app.disable('x-powered-by');

app.use(router);

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

(async () => {
  await db.batch(
    [
      'DROP TABLE IF EXISTS urls',
      'CREATE TABLE IF NOT EXISTS urls (id INTEGER PRIMARY KEY AUTOINCREMENT, original_url TEXT NOT NULL UNIQUE, code_str TEXT UNIQUE, short_url TEXT UNIQUE)'
    ],
    'write'
  );
})();

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
