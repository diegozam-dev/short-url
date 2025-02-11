import { Router } from 'express';
import { ShortenedUrlController } from '../controllers/index';

const shortenedUrlController = new ShortenedUrlController();
const shortenedUrlRouter = Router();

shortenedUrlRouter.post('/encode', shortenedUrlController.encodeUrl);
shortenedUrlRouter.get('/decode/:codeStr', shortenedUrlController.decodeUrl);

export default shortenedUrlRouter;
