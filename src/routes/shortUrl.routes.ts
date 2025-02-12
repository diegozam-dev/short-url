import { Router } from 'express';
import ShortUrlController from '../controllers/shortUrl.controller';

const shortUrlController = new ShortUrlController();
const shortUrlRouter = Router();

shortUrlRouter.post('/encode', shortUrlController.createShortUrl);
shortUrlRouter.get('/decode/:checkSumId', shortUrlController.getOriginalUrl);
shortUrlRouter.get(
  '/redirect/:checkSumId',
  shortUrlController.redirectToOriginalUrl
);

export default shortUrlRouter;
