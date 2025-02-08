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

    let codeStr = '';
    let rowId = lastInsertRowId;

    while (rowId > 0) {
      codeStr = this.ALPHABET.charAt(rowId % this.BASE) + codeStr;
      rowId = Math.floor(rowId / this.BASE);
    }

    const shortUrl = `https://shorty.com/${codeStr}`;

    await this.urlShortenedModel.update(lastInsertRowId, codeStr, shortUrl);

    return await this.urlShortenedModel.getById(lastInsertRowId);
  };

  public decodeUrl = async (codeStr: string) => {
    console.log(`Code String: ${codeStr}`);

    let id = 0;
    for (var i = 0; i < codeStr.length; i++) {
      id = id * this.BASE + this.ALPHABET.indexOf(codeStr.charAt(i));
    }
    console.log(`Id: ${id}`);

    return await this.urlShortenedModel.getById(id);
  };
}

export default UrlShortenedService;
