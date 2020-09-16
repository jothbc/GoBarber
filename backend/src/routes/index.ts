import { Router } from 'express';
import AppointmentsRouter from './Appointment.Router';

const routes = Router();

routes.use('/appointments', AppointmentsRouter);

export default routes;
