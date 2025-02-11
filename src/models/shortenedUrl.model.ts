import { db } from '../db/connection';

class ShortenedUrlModel {
  public getById = async (id: number) => {
    const result = await db.execute({
      sql: 'SELECT * FROM shortened_urls WHERE id = ?',
      args: [id]
    });

    return result;
  };

  public create = async (url: string) => {
    const result = await db.execute({
      sql: 'INSERT INTO shortened_urls (original_url) VALUES (?)',
      args: [url]
    });

    return result;
  };

  public update = async (id: number, shortenedUrl: string) => {
    const result = await db.execute({
      sql: 'UPDATE shortened_urls SET shortened_url = ? WHERE id = ?',
      args: [shortenedUrl, id]
    });

    return result;
  };
}

export default ShortenedUrlModel;
