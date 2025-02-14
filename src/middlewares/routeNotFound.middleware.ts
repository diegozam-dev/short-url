import { Request, Response } from 'express';
import ErrorEnum from '../errors/errorEnum';

const routeNotFound = (req: Request, res: Response) => {
  res.status(404).json({
    response: ErrorEnum.NotFound,
    message: `Cannot ${req.method} ${req.originalUrl}`
  });
};

export default routeNotFound;
