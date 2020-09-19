import { Router } from 'express';
import CreateUserService from '../services/CreateUsersService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const userService = new CreateUserService();
    const user = await userService.execute({ email, password, name });

    delete user.password;

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ message: err.message });
  }
});

export default usersRouter;
