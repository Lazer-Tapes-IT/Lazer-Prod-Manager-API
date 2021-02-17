import { Router } from 'express';
import auth from './auth.routes';
import user from './users.routes';
import member from './member.routes';
const routes = Router();

routes.use('/auth', auth);
routes.use('/user', user);
routes.use('/member', member)
export default routes;
