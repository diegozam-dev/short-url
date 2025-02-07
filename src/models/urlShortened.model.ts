import { db } from '../db/connection';

class UrlShortenedModel {
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

  public update = async (id: number, shortCode: string, shortUrl: string) => {
    const result = await db.execute({
      sql: 'UPDATE urls SET code = ?, short_url = ? WHERE id = ?',
      args: [shortCode, shortUrl, id]
    });

    return result;
  };
}

export default UrlShortenedModel;
