import { NextFunction, Request, Response } from 'express';
import VirusTotalService from '../services/virusTotal.service';

const scanUrl = async (req: Request, res: Response, next: NextFunction) => {
  const { url } = req.body;

  try {
    const analysisId = await VirusTotalService.analyze(url);
    const analysisReport = await VirusTotalService.getAnalysisReport(
      analysisId
    );

    const reportStats = analysisReport.data.attributes.stats;
    const { malicious, suspicious } = reportStats;

    if (malicious > 0 && suspicious > 0) {
      res.status(400).json({
        response: 'ERR_MALICIOUS_URL',
        message: 'The url sent could be malicious.'
      });
    } else {
      next();
    }
  } catch (error: any) {
    const { response } = error;

    next(response.data.error);
  }
};

export default scanUrl;
