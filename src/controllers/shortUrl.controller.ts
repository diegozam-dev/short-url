import { NextFunction, Request, Response } from 'express';
import ShortUrlService from '../services/shortUrl.service';
import { isValidUrl } from '../utils/validateUrl';
import CustomError from '../errors/customError.error';

class ShortUrlController {
  private shortUrlService: ShortUrlService;

  constructor() {
    this.shortUrlService = new ShortUrlService();
  }

  public createShortUrl = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { url } = req.body;

    try {
      if (!isValidUrl(url))
        throw new CustomError({
          code: 'ERR_INVALID_URL',
          message: 'The url is invalid.'
        });

      const shortUrl = await this.shortUrlService.createShortUrl(url);

      res.status(200).json({
        response: 'OK',
        message: 'Url shorted correct.',
        data: { shortUrl }
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public getOriginalUrl = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { checkSumId } = req.params;

    try {
      const originalUrl = await this.shortUrlService.getOriginalUrl(checkSumId);

      res.status(200).json({
        response: 'OK',
        message: 'Url decoded correct.',
        data: { originalUrl }
      });
    } catch (error) {
      next(error);
    }
  };

  public redirectToOriginalUrl = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { checkSumId } = req.params;

    try {
      const originalUrl = await this.shortUrlService.getOriginalUrl(checkSumId);

      res.redirect(301, originalUrl as string);
    } catch (error) {
      next(error);
    }
  };
}

export default ShortUrlController;
