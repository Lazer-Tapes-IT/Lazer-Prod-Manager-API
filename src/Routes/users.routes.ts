import { Router } from 'express';
import { UserController } from '../Controller/User.controller';
import { checkJwt } from '../Middleware/checkJWTs';
import { checkRole } from '../Middleware/checkRole';

const routes = Router();
routes.get('/', [checkJwt], UserController.listAll);
routes.post('/', [checkJwt], UserController.createUser);

export default routes;
