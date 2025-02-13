import express, { json } from 'express';
import cors from 'cors';
import router from './routes/index';
import { PORT } from './config';
import { db } from './db/connection';
import routeNotFound from './middlewares/routeNotFound.middleware';
import errorHandler from './middlewares/errorHandler.middleware';

const app = express();

// Config
app.use(json());
app.use(cors());
app.disable('x-powered-by');

// Routes
app.use(router);

// Middlewares
router.use(routeNotFound);
router.use(errorHandler);

(async () => {
  await db.batch(
    [
      'DROP TABLE IF EXISTS short_urls',
      'CREATE TABLE IF NOT EXISTS short_urls (id INTEGER PRIMARY KEY AUTOINCREMENT, original_url TEXT NOT NULL UNIQUE, short_url TEXT UNIQUE)'
    ],
    'write'
  );
})();

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
