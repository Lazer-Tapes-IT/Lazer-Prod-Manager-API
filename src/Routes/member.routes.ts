import { Router } from 'express';
import { MemberController } from '../Controller/Member.controller';
import { checkJwt } from '../Middleware/checkJWTs';

const routes = Router();
routes.get('/', MemberController.listAll);
routes.post('/', MemberController.saveMember);

export default routes;
