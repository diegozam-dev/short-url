import { rateLimit } from 'express-rate-limit';
import ErrorEnum from '../errors/errorEnum';

const rateLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 5,
  message: {
    response: ErrorEnum.TooManyRequests,
    message: 'You have exceeded your 5 requests per day limit.'
  },
  headers: true
});

export default rateLimiter;
