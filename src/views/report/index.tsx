import { useState, useEffect } from 'react';
import ReportList from './ReportList';
import ReportGenerator from './ReportGenerator';
import ReportChat from './ReportChat';
import { listReports, getReport } from '@/api/ai/report';
import type { ReportItem } from './ReportList';
import type { ReportListItem, ReportDetail } from '@/api/ai/report';

export default function ReportPage() {
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loadingList, setLoadingList] = useState(true);

  useEffect(() => {
    loadReportList();
  }, []);

  const loadReportList = async () => {
    try {
      setLoadingList(true);
      const list: ReportListItem[] = await listReports();
      setReports(list.map(r => ({
        id: r.id,
        topic: r.topic,
        createdAt: r.createdAt,
      })));
    } catch (e) {
      console.error('Failed to load reports', e);
    } finally {
      setLoadingList(false);
    }
  };

  const handleGenerated = (item: ReportItem) => {
    setReports(prev => [item, ...prev]);
    setSelectedId(item.id);
  };

  const handleSelect = async (id: string) => {
    setSelectedId(id);
    const existing = reports.find(r => r.id === id);
    if (existing && !existing.result) {
      try {
        const detail: ReportDetail = await getReport(id);
        setReports(prev => prev.map(r =>
          r.id === id ? { ...r, result: { id: detail.id, topic: detail.topic, createdAt: detail.createdAt, content: detail.content } } : r
        ));
      } catch (e) {
        console.error('Failed to load report detail', e);
      }
    }
  };

  const handleDelete = (id: string) => {
    setReports(prev => prev.filter(r => r.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  const selectedReport = reports.find(r => r.id === selectedId);

  return (
    <div style={{ display: 'flex', gap: 12, height: 'calc(100vh - 72px - 16px)', padding: '8px' }}>
      <div style={{ width: 260, flexShrink: 0 }}>
        <ReportList
          reports={reports}
          selectedId={selectedId}
          onSelect={handleSelect}
          onDelete={handleDelete}
        />
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12, minWidth: 0 }}>
        <div style={{ flex: selectedReport ? '0 0 auto' : 1 }}>
          <ReportGenerator onGenerated={handleGenerated} />
        </div>

        {selectedReport?.result && (
          <div
            className="glass-card"
            style={{
              flex: 1,
              padding: 20,
              overflow: 'auto',
              minHeight: 200,
            }}
          >
            <h3 style={{ fontSize: 15, fontWeight: 600, color: '#1e293b', marginBottom: 12 }}>
              {selectedReport.topic}
            </h3>
            <div style={{
              fontSize: 13,
              color: '#334155',
              lineHeight: 1.8,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}>
              {selectedReport.result.content}
            </div>
          </div>
        )}
      </div>

      <div style={{ width: 340, flexShrink: 0 }}>
        <ReportChat />
      </div>
    </div>
  );
}
