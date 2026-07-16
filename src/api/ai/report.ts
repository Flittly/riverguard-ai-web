import request from '@/api/request';

export interface ReportGenerateParams {
  topic: string;
  requirements?: string;
}

export interface ReportGenerateResult {
  id: string;
  topic: string;
  createdAt: string;
  content: string;
}

export interface ReportListItem {
  id: string;
  topic: string;
  createdAt: string;
  preview: string;
}

export interface ReportDetail {
  id: string;
  topic: string;
  createdAt: string;
  content: string;
}

export async function generateReport(params: ReportGenerateParams): Promise<ReportGenerateResult> {
  return request.post('/ai/report/generate', params);
}

export async function listReports(): Promise<ReportListItem[]> {
  return request.get('/ai/report/list');
}

export async function getReport(reportId: string): Promise<ReportDetail> {
  return request.get(`/ai/report/${reportId}`);
}
