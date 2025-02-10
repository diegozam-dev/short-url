import { Request, Response } from 'express';
import { UrlService } from '../services/index';

class UrlController {
  private urlService: UrlService;

  constructor() {
    this.urlService = new UrlService();
  }

  public encodeUrl = async (req: Request, res: Response) => {
    const { url } = req.body;

    try {
      const { rows } = await this.urlService.encodeUrl(url);

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
      const { rows } = await this.urlService.decodeUrl(codeStr);

      res.redirect(301, `${rows[0].original_url}`);
    } catch (error) {
      console.trace(error);
    }
  };
}

export default UrlController;
