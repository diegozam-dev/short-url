import { Router } from 'express';
import { UrlShortenedController } from '../controllers/index';

const urlShortenedController = new UrlShortenedController();
const urlShortenedRouter = Router();

urlShortenedRouter.post('/encode', urlShortenedController.encodeUrl);
urlShortenedRouter.get('/decode/:codeStr', urlShortenedController.decodeUrl);

export default urlShortenedRouter;
