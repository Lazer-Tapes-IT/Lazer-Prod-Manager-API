import { Router } from 'express';
import { ProjectController } from '../Controller/Project.controller';

const routes = Router();
routes.get('/', ProjectController.listAll);
routes.post('/', ProjectController.saveProject);

export default routes;
