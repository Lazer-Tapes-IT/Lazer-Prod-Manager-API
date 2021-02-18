import { Router } from 'express';
import { StudioController } from '../Controller/Studio.controller';

const routes = Router();
routes.get('/', StudioController.listAll);
routes.post('/', StudioController.saveStudio);
routes.delete('/:id', StudioController.deleteStudio);
routes.patch('/:id', StudioController.updateStudio);
export default routes;
