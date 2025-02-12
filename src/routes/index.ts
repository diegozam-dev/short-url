import { Request, Response, Router } from 'express';
import shortUrlRouter from './shortUrl.routes';
import routeNotFound from '../middlewares/routeNotFound.middleware';
import { BASE_URL } from '../config';
import errorHandler from '../middlewares/errorHandler.middleware';

const apiRouter = Router();
const router = Router();

apiRouter.use('/url', shortUrlRouter);

apiRouter.use(routeNotFound);
apiRouter.use(errorHandler);

router.use('/v1/api', apiRouter);
router.use('/:checkSumId', (req: Request, res: Response) => {
  const { checkSumId } = req.params;
  res.redirect(301, `${BASE_URL}/v1/api/url/redirect/${checkSumId}`);
});

export default router;
