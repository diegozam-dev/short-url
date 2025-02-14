import { Router } from 'express';
import ShortUrlController from '../controllers/shortUrl.controller';
import scanUrl from '../middlewares/scanUrl.middleware';
import validateUrl from '../middlewares/validateUrl.middleware';
import rateLimiter from '../middlewares/rateLimiter.middleware';
import apicache from 'apicache';

const shortUrlController = new ShortUrlController();
const shortUrlRouter = Router();

const cache = apicache.options({
  defaultDuration: '10 minute',
  statusCodes: {
    include: [200]
  }
}).middleware;

// Middlewares
shortUrlRouter.use(cache());

shortUrlRouter.post(
  '/encode',
  rateLimiter,
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
