import { Request, Response, Router } from 'express';
import urlShortenedRouter from './urlShortened.routes';
import { BASE_URL } from '../config';

const apiRouter = Router();
const router = Router();

apiRouter.use('/url-shortened', urlShortenedRouter);

router.use('/v1/api', apiRouter);
router.use('/:codeStr', (req: Request, res: Response) => {
  return res.redirect(
    301,
    `${BASE_URL}/v1/api/url-shortened/decode/${req.path}`
  );
});

export default router;
