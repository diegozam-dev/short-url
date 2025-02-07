import { Router } from 'express';
import urlShortenedRouter from './urlShortened.routes';

const apiRouter = Router();
const router = Router();

apiRouter.use('/url-shortened', urlShortenedRouter);

router.use('/v1/api', apiRouter);

export default router;
