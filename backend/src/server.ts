import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
// as rotas assincronas se forem gerados erros la dentro ele nao vai conseguir ir para a proxima rota (no caso o middleware que lida com os erros)
// para isso deve-se usar os try catch dentro da rota ou se for usar um middleware de error basta usar a lib abaixo e claro usar o middlewre depois das rotas
import 'express-async-errors';

import './database';

import Routes from './routes';

import uploadConfig from './config/upload';

import AppError from './errors/AppError';

const app = express();
app.use(express.json());

// uma rota statica que serve a pasta que contem as imagens
app.use('/files', express.static(uploadConfig.directory));

app.use(Routes);

// criar o middleware que vai tratar os errors
// esse middleware no express precisa receber 4 parametros, (err,request,response,next)
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log('Backend iniciado 🚀');
});
