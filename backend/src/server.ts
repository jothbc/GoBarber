import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';

import './database';

import Routes from './routes';

const app = express();
app.use(express.json());

app.use(Routes);

app.listen(3333, () => {
  console.log('Backend iniciado 🚀');
});
