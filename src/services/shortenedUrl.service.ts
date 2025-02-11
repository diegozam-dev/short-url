import ShortenedUrlModel from '../models/shortenedUrl.model';
import { BASE_URL } from '../config';

class ShortenedUrlService {
  private shortenedUrlModel: ShortenedUrlModel;
  private readonly ALPHABET: string;
  private readonly ENCODE_BASE: number;

  constructor() {
    this.shortenedUrlModel = new ShortenedUrlModel();
    this.ALPHABET = '23456789bcdfghjkmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ-_';
    this.ENCODE_BASE = this.ALPHABET.length;
  }

  public shortenUrl = async (url: string) => {
    const { lastInsertRowid } = await this.shortenedUrlModel.create(url);
    const rowId = Number(lastInsertRowid);

    const shortUrl = this.getShortenedUrl(rowId);

    await this.shortenedUrlModel.update(rowId, shortUrl);
    const { rows } = await this.shortenedUrlModel.getById(rowId);

    return rows[0].shortened_url;
  };

  public getOriginalUrl = async (code: string) => {
    if (!this.validateCheckSum(code)) throw new Error('Invalid url.');

    const encodedId = code.substring(2);
    const id = this.decodeId(encodedId);

    const { rows } = await this.shortenedUrlModel.getById(id);

    return rows[0].original_url;
  };

  private decodeId = (encodedId: string) => {
    let id = 0;
    for (var i = 0; i < encodedId.length; i++) {
      id = id * this.ENCODE_BASE + this.ALPHABET.indexOf(encodedId.charAt(i));
    }

    return id;
  };

  private encodeId = (id: number) => {
    let currentId = id;
    let codeStr = '';

    while (currentId > 0) {
      codeStr = this.ALPHABET.charAt(currentId % this.ENCODE_BASE) + codeStr;
      currentId = Math.floor(currentId / this.ENCODE_BASE);
    }

    return codeStr;
  };

  private getCheckSum = (id: number) => {
    const checkSumValue =
      (id * 17 + 31) % (this.ENCODE_BASE * this.ENCODE_BASE);

    return this.encodeId(checkSumValue).padStart(2, this.ALPHABET.charAt(0));
  };

  private getShortenedUrl(id: number) {
    const codeStr = this.encodeId(id);
    const checkSumValue = this.getCheckSum(id);
    const shortenedUrl = `${BASE_URL}/${checkSumValue + codeStr}`;

    return shortenedUrl;
  }

  private validateCheckSum = (code: string) => {
    const checkSumValue = code.substring(0, 2);
    const encodedId = code.substring(2);
    const id = this.decodeId(encodedId);

    return this.getCheckSum(id) === checkSumValue;
  };
}

export default ShortenedUrlService;
