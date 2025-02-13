import { Request, Response, Router } from 'express';
import shortUrlRouter from './shortUrl.routes';

import { BASE_URL } from '../config';

const apiRouter = Router();
const router = Router();

apiRouter.use('/url', shortUrlRouter);

router.use('/v1/api', apiRouter);

router.get('/:checkSumId', (req: Request, res: Response) => {
  const { checkSumId } = req.params;
  res.redirect(301, `${BASE_URL}/v1/api/url/redirect/${checkSumId}`);
});

export default router;
