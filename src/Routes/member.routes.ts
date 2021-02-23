import { Router } from 'express';
import { MemberController } from '../Controller/Member.controller';

const routes = Router();
routes.get('/', MemberController.listAll);
routes.post('/', MemberController.saveMember);
routes.get('/:id', MemberController.getOneById);
routes.delete('/:id', MemberController.deleteMember);
routes.patch('/:id', MemberController.updateMember);
routes.get('/project/:id', MemberController.getOneByProjectId);
export default routes;
