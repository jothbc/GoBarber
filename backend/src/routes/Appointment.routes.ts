import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import { Router } from 'express';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

// como todas as rotas de appointments a pessoa precisa estar logada entao passo o middleware de autenticação
appointmentsRouter.use(ensureAuthenticated);

/* Caso fosse preciso o middleware só em uma rota era só passar ele dentro da rota antes da função final da rota
  EX:
  appointmentsRouter.get('/', ensureAuthenticated , async (request, response) => {
  const appointments = await getCustomRepository(AppointmentsRepository).find();
  return response.json(appointments);
});
*/

appointmentsRouter.get('/', async (request, response) => {
  const appointments = await getCustomRepository(AppointmentsRepository).find();
  return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const createAppointment = new CreateAppointmentService();
  const appointment = await createAppointment.execute({
    provider_id,
    date: parsedDate,
  });

  return response.json(appointment);
});

export default appointmentsRouter;
