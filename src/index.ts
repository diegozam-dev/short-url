import express from 'express';
import { PORT } from './config';

const app = express();
app.disable('x-powered-by');

app.get('/', (_, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
