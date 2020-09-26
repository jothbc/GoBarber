import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

import AppError from '../errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  // validação do token JWT
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  // Bearer ueqoiweuqowejlaskdasjkod (formato com ta o token vindo da header)
  const [, token] = authHeader.split(' ');

  // caso o token seja invalido o verify vai disparar um error, mas como eu quero mandar um erro padrao é só colocar no try e disparar meu erro personalizado
  try {
    const decoded = verify(token, authConfig.jwt.secret);

    // é interessante passar essa info do sub para as proximas middlewares para as proximas tambem terem acesso
    // pra isso vamos passar junto com o request..

    // forçamos o response do verify a ter um tipo para poder fazer a desestruturação
    const { sub } = decoded as TokenPayload;

    // o request do express nao possui o user dentro dele, para isso vamos incluir o user como propriedade do express
    // criar pasta @types -> express.d.ts (nome do pacote . d (declaração de tipos) . ts)
    request.user = { id: sub };
    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}
