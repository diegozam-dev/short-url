import { Request, Response, NextFunction } from 'express';
import CustomError from '../errors/customError.error';
import ErrorEnum from '../errors/errorEnum';

const errorHandler = (
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let status: number;
  let response: string;
  let message: string;

  if (err.code === ErrorEnum.InvalidUrl) {
    status = 400;
    response = err.code;
    message = err.message;
  } else if (err.code === ErrorEnum.UrlNotExists) {
    status = 404;
    response = err.code;
    message = err.message;
  } else if (err.code === 'TooManyRequestsError') {
    status = 429;
    response = ErrorEnum.TooManyRequests;
    message = 'Too many requests.';
  } else if (err.code === 'AuthenticationRequiredError') {
    status = 401;
    response = ErrorEnum.AuthRequired;
    message = 'Verify that you have provided your API key.';
  } else {
    status = 500;
    response = ErrorEnum.UnknownError;
    message = 'Server error.';
  }

  res.status(status).json({
    response,
    message
  });
};

export default errorHandler;
