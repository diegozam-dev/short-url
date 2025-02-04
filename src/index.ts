import express from 'express';

const app = express();
app.disable('x-powered-by');

app.get('/', (_, res) => {
  res.send('Hello World!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
