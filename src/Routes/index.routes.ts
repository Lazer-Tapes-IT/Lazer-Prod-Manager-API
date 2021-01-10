import { Router } from 'express';
import auth from './auth.routes';
import user from './users.routes';

const routes = Router();

routes.use('/auth', auth);
routes.use('/user', user);
export default routes;
