import { UrlModel } from '../models/index';
import { BASE_URL } from '../config';

class UrlService {
  private urlModel: UrlModel;
  private readonly ALPHABET: string;
  private readonly ENCODE_BASE: number;

  constructor() {
    this.urlModel = new UrlModel();
    this.ALPHABET = '23456789bcdfghjkmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ-_';
    this.ENCODE_BASE = this.ALPHABET.length;
  }

  public encodeUrl = async (url: string) => {
    const { lastInsertRowid } = await this.urlModel.create(url);
    const rowId = Number(lastInsertRowid);

    const codeStr = this.getCodeStr(rowId);
    const checkSumValue = this.getCheckSum(rowId);
    const shortUrl = `${BASE_URL}/${checkSumValue + codeStr}`;

    await this.urlModel.update(rowId, codeStr, shortUrl);

    return await this.urlModel.getById(rowId);
  };

  public decodeUrl = async (codeStr: string) => {
    if (!this.validateCheckSum(codeStr)) throw new Error('Invalid url.');

    const encodeId = codeStr.substring(2);
    const id = this.decodeId(encodeId);

    return await this.urlModel.getById(id);
  };

  private decodeId = (encodedId: string) => {
    let id = 0;
    for (var i = 0; i < encodedId.length; i++) {
      id = id * this.ENCODE_BASE + this.ALPHABET.indexOf(encodedId.charAt(i));
    }

    return id;
  };

  private getCodeStr = (rowId: number) => {
    let id = rowId;
    let codeStr = '';

    while (id > 0) {
      codeStr = this.ALPHABET.charAt(id % this.ENCODE_BASE) + codeStr;
      id = Math.floor(id / this.ENCODE_BASE);
    }

    return codeStr;
  };

  private getCheckSum = (id: number) => {
    const checkSumValue =
      (id * 17 + 31) % (this.ENCODE_BASE * this.ENCODE_BASE);

    return this.getCodeStr(checkSumValue).padStart(2, this.ALPHABET.charAt(0));
  };

  private validateCheckSum = (codeStr: string) => {
    const checkSumValue = codeStr.substring(0, 2);
    const encodedId = codeStr.substring(2);
    const id = this.decodeId(encodedId);

    return this.getCheckSum(id) === checkSumValue;
  };
}

export default UrlService;
