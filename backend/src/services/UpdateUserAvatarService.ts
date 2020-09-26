import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import User from '../models/User';
import uploadConfig from '../config/upload';

import AppError from '../errors/AppError';

interface Request {
  id_user: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ id_user, avatarFilename }: Request): Promise<User> {
    const userRepository = getRepository(User);

    // o findOne se passado apenas uma variavel ele vai tentar buscar por id
    const user = await userRepository.findOne(id_user);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 401);
    }

    if (user.avatar) {
      // deletar avatar anterior
      // busca o path do avatar na tmp, o join une os caminhos (...tmp + 12312312-meuavatar.png)
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

      // pra saber se o arquivo ja existe basta importar o fs (files system) do node
      // utilizar o promisses para poder utilziar as funcoes em formato de promisses, assim usando await ao invez de callbacks
      // o stat traz o status do arquivo, porem só se ele existir, assim da pra validar se ele existe ou nao
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      // se o arquivo existir vamos deletar para nao ficar ocupando espaço no disco
      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    // define o novo avatar (o nome dele no caso)
    user.avatar = avatarFilename;

    // o metodo save do repository salva o modelo ou atualiza ele com base no id
    // primeiro ele verifica se o modelo ja existe, caso nao exista ele salva, caso exista ele faz o update
    // como ali em cima buscamos o user direto do db ele ja contem todas as informações desse user, bastou atualizar o avatar e salvar ele de novo
    await userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
