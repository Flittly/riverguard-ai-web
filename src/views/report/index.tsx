import { useState } from 'react';
import ReportList from './ReportList';
import ReportGenerator from './ReportGenerator';
import ReportChat from './ReportChat';
import type { ReportItem } from './ReportList';

export default function ReportPage() {
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleGenerated = (item: ReportItem) => {
    const newList = [item, ...reports];
    setReports(newList);
    setSelectedId(item.id);
  };

  const handleDelete = (id: string) => {
    setReports((prev) => prev.filter((r) => r.id !== id));
    if (selectedId === id) {
      setSelectedId(null);
    }
  };

  const selectedReport = reports.find((r) => r.id === selectedId);

  return (
    <div style={{ display: 'flex', gap: 12, height: 'calc(100vh - 72px - 16px)', padding: '8px' }}>
      <div style={{ width: 260, flexShrink: 0 }}>
        <ReportList
          reports={reports}
          selectedId={selectedId}
          onSelect={setSelectedId}
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
