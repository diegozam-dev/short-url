import axios from 'axios';
import { API_KEY_URL_SCAN } from '../config';

class VirusTotalService {
  private static API_URL = 'https://www.virustotal.com/api/v3';

  public static analyze = async (url: string) => {
    const urlScanOptions = {
      method: 'POST',
      url: `${this.API_URL}/urls`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-apikey': API_KEY_URL_SCAN
      },
      data: {
        url
      }
    };

    const result = await axios(urlScanOptions);
    return result.data.data.id;
  };

  public static getAnalysisReport = async (analysisId: number) => {
    const urlReportOptions = {
      method: 'GET',
      url: `${this.API_URL}/analyses/${analysisId}`,
      headers: {
        accept: 'application/json',
        'x-apikey': API_KEY_URL_SCAN
      }
    };

    const result = await axios(urlReportOptions);

    return result.data;
  };
}

export default VirusTotalService;
