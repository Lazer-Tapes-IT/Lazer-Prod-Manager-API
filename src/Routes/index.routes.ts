import { Router } from 'express';
import auth from './auth.routes';
import user from './users.routes';
import member from './member.routes';
import studio from './studio.routes';
import project from './project.routes';
const routes = Router();

routes.use('/auth', auth);
routes.use('/user', user);
routes.use('/member', member);
routes.use('/studio', studio);
routes.use('/project', project);
export default routes;
