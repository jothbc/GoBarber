import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import User from '../models/User';
import authConfig from '../config/auth';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    // busca um user com esse email
    const user = await usersRepository.findOne({
      where: { email },
    });

    // caso nao exista devolve o throw
    if (!user) {
      throw new Error('Email/Senha incorreto');
    }

    // compara o password descriptografado com o password criptografado vindo do banco de dados
    const passwordMatched = await compare(password, user.password);

    // caso seja incorreto devolve um throw
    if (!passwordMatched) {
      throw new Error('Email/Senha incorreto');
    }

    // gera o token
    // primeiro parametro sao as infos que quero disponibilizar (password nunca)
    // um hash ou qualquer string que represente uma senha, ele vai usar essa string pra criptografa o token (da pra entrar no site md5 online e escrever qualquer coisa e gerar um hash)
    // configurações do token, o subject é pra saber qual o usuario gerou o token, expiresIn define quanto tempo ele vai demora pra expira
    const { expiresIn, secret } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}

export default AuthenticateUserService;
