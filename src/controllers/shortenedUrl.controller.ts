import { Request, Response } from 'express';
import ShortenedUrlService from '../services/shortenedUrl.service';

class ShortenedUrlController {
  private shortenedUrlService: ShortenedUrlService;

  constructor() {
    this.shortenedUrlService = new ShortenedUrlService();
  }

  public shortenUrl = async (req: Request, res: Response) => {
    const { url } = req.body;

    try {
      const shortenedUrl = await this.shortenedUrlService.shortenUrl(url);

      res.status(200).json({
        response: 'OK',
        message: 'Url shorted correct.',
        data: { shortenedUrl }
      });
    } catch (error) {
      console.trace(error);
    }
  };

  public getOriginalUrlAndRedirect = async (req: Request, res: Response) => {
    const { code } = req.params;

    try {
      const originalUrl = await this.shortenedUrlService.getOriginalUrl(code);

      res.redirect(301, originalUrl as string);
    } catch (error) {
      console.trace(error);
    }
  };

  public getOriginalUrl = async (req: Request, res: Response) => {
    const { url } = req.body;
    const code = new URL(url).pathname.substring(1);

    try {
      const originalUrl = await this.shortenedUrlService.getOriginalUrl(code);
      res.status(200).json({
        response: 'OK',
        message: 'Url decoded correct.',
        data: { originalUrl }
      });
    } catch (error) {
      console.trace(error);
    }
  };
}

export default ShortenedUrlController;
