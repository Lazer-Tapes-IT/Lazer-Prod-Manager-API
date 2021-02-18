import { Router } from 'express';
import { UserController } from '../Controller/User.controller';
import { checkJwt } from '../Middleware/checkJWTs';

const routes = Router();
routes.get('/', UserController.listAll);
routes.post('/', UserController.createUser);
routes.get('/:id', UserController.getOneById);
routes.patch('/:id', UserController.updateUser);
routes.delete('/:id', UserController.deleteUser);

export default routes;
