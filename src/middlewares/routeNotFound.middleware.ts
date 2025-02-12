import { Request, Response } from 'express';

const routeNotFound = (req: Request, res: Response) => {
  res.status(404).json({
    response: 'ERR_NOT_FOUND',
    message: `Cannot ${req.method} ${req.originalUrl}`
  });
};

export default routeNotFound;
