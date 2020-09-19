import { hash } from 'bcryptjs';
import { getRepository } from 'typeorm';
import User from '../models/User';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ email, name, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExist = await usersRepository.findOne({
      where: { email },
    });

    if (checkUserExist) {
      throw new Error('Email já existe para o cadastro de usuário');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
