import { Router } from 'express';
import { ShortenedUrlController } from '../controllers/index';

const shortenedUrlController = new ShortenedUrlController();
const shortenedUrlRouter = Router();

shortenedUrlRouter.post('/encode', shortenedUrlController.shortenUrl);
shortenedUrlRouter.post('/decode/', shortenedUrlController.getOriginalUrl);
shortenedUrlRouter.get(
  '/decode/:code',
  shortenedUrlController.getOriginalUrlAndRedirect
);

export default shortenedUrlRouter;
