import { Router } from 'express';
import { ProjectController } from '../Controller/Project.controller';

const routes = Router();
routes.get('/', ProjectController.listAll);
routes.post('/', ProjectController.saveProject);
routes.delete('/:id', ProjectController.deleteProject);
routes.patch('/:id', ProjectController.uptdateProject);
routes.get('/:id', ProjectController.getOneById);
routes.get('/studio/:id', ProjectController.getOneByUserId);
export default routes;
