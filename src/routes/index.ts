import { Request, Response, Router } from 'express';
import shortUrlRouter from './shortUrl.routes';
import routeNotFound from '../middlewares/routeNotFound.middleware';
import errorHandler from '../middlewares/errorHandler.middleware';
import { BASE_URL } from '../config';

const apiRouter = Router();
const router = Router();

apiRouter.use('/url', shortUrlRouter);

router.use('/v1/api', apiRouter);

router.get('/', (_req, res) => {
  res.send('Hello World!');
});

router.get('/:checkSumId', (req: Request, res: Response) => {
  const { checkSumId } = req.params;
  res.redirect(301, `${BASE_URL}/v1/api/url/redirect/${checkSumId}`);
});

// Middlewares
router.use(routeNotFound);
router.use(errorHandler);

export default router;
