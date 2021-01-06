import { Router } from 'express';
import AuthController from '../Controller/Auth.controller';

const routes = Router();
routes.post('/login', AuthController.login);
routes.post('/change-password', AuthController.changePassword);
export default routes;
