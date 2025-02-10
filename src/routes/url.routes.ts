import { Router } from 'express';
import { UrlController } from '../controllers/index';

const urlController = new UrlController();
const urlRouter = Router();

urlRouter.post('/encode', urlController.encodeUrl);
urlRouter.get('/decode/:codeStr', urlController.decodeUrl);

export default urlRouter;
