import { Router } from 'express';
import { UserController } from '../Controller/User.controller';
import { checkJwt } from '../Middleware/checkJWTs';

const routes = Router();
routes.get('/', UserController.listAll);
routes.post('/', UserController.createUser);
routes.get('/:id', UserController.getOneById);

export default routes;
