import { UrlShortenedModel } from '../models/index';

class UrlShortenedService {
  private urlShortenedModel: UrlShortenedModel;
  private readonly ALPHABET: string;
  private readonly BASE: number;

  constructor() {
    this.urlShortenedModel = new UrlShortenedModel();
    this.ALPHABET = '23456789bcdfghjkmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ-_';
    this.BASE = this.ALPHABET.length;
  }

  public encodeUrl = async (url: string) => {
    const createdResult = await this.urlShortenedModel.create(url);

    const lastInsertRowId = Number(createdResult.lastInsertRowid);

    let shortCode = '';
    let rowId = lastInsertRowId;

    while (rowId > 0) {
      shortCode = this.ALPHABET.charAt(rowId % this.BASE) + shortCode;
      rowId = Math.floor(rowId / this.BASE);
    }

    const shortUrl = `https://shorty.com/${shortCode}`;

    await this.urlShortenedModel.update(lastInsertRowId, shortCode, shortUrl);

    return await this.urlShortenedModel.getById(lastInsertRowId);
  };
}

export default UrlShortenedService;
