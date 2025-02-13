import { Router } from 'express';
import ShortUrlController from '../controllers/shortUrl.controller';
import scanUrl from '../middlewares/scanUrl.middleware';
import validateUrl from '../middlewares/validateUrl.middleware';

const shortUrlController = new ShortUrlController();
const shortUrlRouter = Router();

shortUrlRouter.post(
  '/encode',
  validateUrl,
  scanUrl,
  shortUrlController.createShortUrl
);
shortUrlRouter.get('/decode/:checkSumId', shortUrlController.getOriginalUrl);
shortUrlRouter.get(
  '/redirect/:checkSumId',
  shortUrlController.redirectToOriginalUrl
);

export default shortUrlRouter;
