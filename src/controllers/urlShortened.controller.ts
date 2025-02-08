import { Request, Response } from 'express';
import { UrlShortenedService } from '../services/index';

class UrlShortenedController {
  private urlShortenedService: UrlShortenedService;

  constructor() {
    this.urlShortenedService = new UrlShortenedService();
  }

  public encodeUrl = async (req: Request, res: Response) => {
    const { url } = req.body;

    try {
      const { rows } = await this.urlShortenedService.encodeUrl(url);

      res.status(200).json({
        response: 'OK',
        message: 'Url shorted correct.',
        data: { shortUrl: rows[0].short_url }
      });
    } catch (error) {
      console.trace(error);
    }
  };

  public decodeUrl = async (req: Request, res: Response) => {
    const { codeStr } = req.params;

    try {
      const { rows } = await this.urlShortenedService.decodeUrl(codeStr);

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

export default UrlShortenedController;
