import { UrlModel } from '../models/index';
import { BASE_URL } from '../config';

class UrlService {
  private urlModel: UrlModel;
  private readonly ALPHABET: string;
  private readonly BASE: number;

  constructor() {
    this.urlModel = new UrlModel();
    this.ALPHABET = '23456789bcdfghjkmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ-_';
    this.BASE = this.ALPHABET.length;
  }

  public encodeUrl = async (url: string) => {
    const { lastInsertRowid } = await this.urlModel.create(url);
    const rowId = Number(lastInsertRowid);

    const codeStr = this.generateCodeStr(rowId);
    const shortUrl = `${BASE_URL}/${codeStr}`;

    await this.urlModel.update(rowId, codeStr, shortUrl);

    return await this.urlModel.getById(rowId);
  };

  public decodeUrl = async (codeStr: string) => {
    let id = 0;
    for (var i = 0; i < codeStr.length; i++) {
      id = id * this.BASE + this.ALPHABET.indexOf(codeStr.charAt(i));
    }

    return await this.urlModel.getById(id);
  };

  private generateCodeStr(rowId: number) {
    let id = rowId;
    let codeStr = '';

    while (id > 0) {
      codeStr = this.ALPHABET.charAt(id % this.BASE) + codeStr;
      id = Math.floor(id / this.BASE);
    }

    return codeStr;
  }
}

export default UrlService;
