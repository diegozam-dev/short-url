import { Request, Response, NextFunction } from 'express';
import CustomError from '../errors/customError.error';

const errorHandler = (
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let status: number;
  let response: string;
  let message: string;

  if (err.code === 'ERR_INVALID_URL') {
    status = 400;
    response = err.code;
    message = err.message;
  } else if (err.code === 'ERR_URL_NOT_EXISTS') {
    status = 404;
    response = err.code;
    message = err.message;
  } else if (err.code === 'TooManyRequestsError') {
    status = 429;
    response = 'ERR_TOO_MANY_REQUESTS';
    message = 'Too many requests.';
  } else if (err.code === 'AuthenticationRequiredError') {
    status = 401;
    response = 'ERR_AUTH_REQUIRED';
    message = 'Verify that you have provided your API key.';
  } else {
    status = 500;
    response = 'ERR_UNKNOWN_ERROR';
    message = 'Server error.';
  }

  res.status(status).json({
    response,
    message
  });
};

export default errorHandler;
