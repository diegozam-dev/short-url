import { Router } from 'express';
import { ShortenedUrlController } from '../controllers/index';

const shortenedUrlController = new ShortenedUrlController();
const shortenedUrlRouter = Router();

shortenedUrlRouter.post('/encode', shortenedUrlController.encodeUrl);
shortenedUrlRouter.post('/decode/', shortenedUrlController.decodeUrl);
shortenedUrlRouter.get(
  '/decode/:codeStr',
  shortenedUrlController.decodeUrlAndRedirect
);

export default shortenedUrlRouter;
