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

export async function updateReport(reportId: string, content: string): Promise<void> {
  return request.put(`/ai/report/${reportId}`, { content });
}

export async function exportReport(reportId: string): Promise<void> {
  const token = localStorage.getItem('token');
  const resp = await fetch(`/api/ai/report/${reportId}/export`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!resp.ok) throw new Error(`导出失败: ${resp.status}`);
  const blob = await resp.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${reportId}.doc`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
