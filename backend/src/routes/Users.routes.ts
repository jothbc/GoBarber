import { Router } from 'express';
import multer from 'multer';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreateUserService from '../services/CreateUsersService';
import uploadConfig from '../config/upload';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const usersRouter = Router();

// faz o multer receber as configurações que definimos no uploadConfig
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const userService = new CreateUserService();
  const user = await userService.execute({ email, password, name });

  delete user.password;

  return response.json(user);
});

// no upload.single o parametro que vai dentro é o nome do campo que vai conter o arquivo no envio
// caso de erro ao tentar utilizar o upload.single é só ir em node_modules/multer e deletar o node_modules que esta la dentro (é um erro do multer)
usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.execute({
      id_user: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  },
);

export default usersRouter;
