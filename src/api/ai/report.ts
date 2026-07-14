import request from '@/api/request';

export interface ReportGenerateParams {
  topic: string;
  requirements?: string;
}

export interface ReportGenerateResult {
  topic: string;
  content: string;
}

export async function generateReport(params: ReportGenerateParams): Promise<ReportGenerateResult> {
  return request.post('/ai/report/generate', params);
}
