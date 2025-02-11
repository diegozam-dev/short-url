import { Request, Response } from 'express';
import { ShortenedUrlService } from '../services/index';

class ShortenedUrlController {
  private shortenedUrlService: ShortenedUrlService;

  constructor() {
    this.shortenedUrlService = new ShortenedUrlService();
  }

  public encodeUrl = async (req: Request, res: Response) => {
    const { url } = req.body;

    try {
      const { rows } = await this.shortenedUrlService.encodeUrl(url);

      res.status(200).json({
        response: 'OK',
        message: 'Url shorted correct.',
        data: { shortUrl: rows[0].short_url }
      });
    } catch (error) {
      console.trace(error);
    }
  };

  public decodeUrlAndRedirect = async (req: Request, res: Response) => {
    const { codeStr } = req.params;

    try {
      const { rows } = await this.shortenedUrlService.decodeUrl(codeStr);

      res.redirect(301, `${rows[0].original_url}`);
    } catch (error) {
      console.trace(error);
    }
  };

  public decodeUrl = async (req: Request, res: Response) => {
    const { url } = req.body;
    const codeStr = new URL(url).pathname.substring(1);

    try {
      const { rows } = await this.shortenedUrlService.decodeUrl(codeStr);
      res.status(200).json({
        response: 'OK',
        message: 'Url decoded correct.',
        data: { originalUrl: rows[0].original_url }
      });
    } catch (error) {
      console.trace(error);
    }
  };
}

export default ShortenedUrlController;
