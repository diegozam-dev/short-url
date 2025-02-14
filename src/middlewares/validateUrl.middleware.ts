import { NextFunction, Request, Response } from 'express';
import ErrorEnum from '../errors/errorEnum';

const validateUrl = (req: Request, res: Response, next: NextFunction) => {
  const { url } = req.body;

  const urlRegExp = new RegExp(
    '^(https?:\\/\\/)?' +
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
      '((\\d{1,3}\\.){3}\\d{1,3})|' +
      '(localhost))' +
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
      '(\\?[;&a-z\\d%_.~+=-]*)?' +
      '(\\#[-a-z\\d_]*)?$',
    'i'
  );
  const validateResult = !!urlRegExp.test(url);

  if (!validateResult) {
    res.status(400).json({
      response: ErrorEnum.InvalidUrl,
      message: 'The url is invalid.'
    });
  } else {
    next();
  }
};

export default validateUrl;
