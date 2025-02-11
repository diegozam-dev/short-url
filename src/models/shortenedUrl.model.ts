import { db } from '../db/connection';

class ShortenedUrlModel {
  public getById = async (id: number) => {
    const result = await db.execute({
      sql: 'SELECT * FROM urls WHERE id = ?',
      args: [id]
    });

    return result;
  };

  public create = async (url: string) => {
    const result = await db.execute({
      sql: 'INSERT INTO urls (original_url) VALUES (?)',
      args: [url]
    });

    return result;
  };

  public update = async (id: number, codeStr: string, shortUrl: string) => {
    const result = await db.execute({
      sql: 'UPDATE urls SET code_str = ?, short_url = ? WHERE id = ?',
      args: [codeStr, shortUrl, id]
    });

    return result;
  };
}

export default ShortenedUrlModel;
