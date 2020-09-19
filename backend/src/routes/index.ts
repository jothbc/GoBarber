import { Router } from 'express';
import appointmentsRouter from './Appointment.routes';
import sessionsRouter from './Sessions.routes';
import usersRouter from './Users.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
