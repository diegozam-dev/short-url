import { Request, Response, Router } from 'express';
import urlRouter from './url.routes';
import { BASE_URL } from '../config';

const apiRouter = Router();
const router = Router();

apiRouter.use('/url', urlRouter);

router.use('/v1/api', apiRouter);
router.use('/:codeStr', (req: Request, res: Response) => {
  const { codeStr } = req.params;
  res.redirect(301, `${BASE_URL}/v1/api/url/decode/${codeStr}`);
});

export default router;
