import { NextFunction, Request, Response } from 'express';
import urlPattern from '../utils/urlPattern';

const validateUrl = (req: Request, res: Response, next: NextFunction) => {
  const { url } = req.body;

  const urlRegExp = new RegExp(urlPattern, 'i');
  const validateResult = !!urlRegExp.test(url);

  if (!validateResult) {
    res.status(400).json({
      response: 'ERR_INVALID_URL',
      message: 'The url is invalid.'
    });
  } else {
    next();
  }
};

export default validateUrl;
