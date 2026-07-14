import type { ReportGenerateResult } from '@/api/ai/report';

export interface ReportItem {
  id: string;
  topic: string;
  createdAt: string;
  result?: ReportGenerateResult;
}

interface ReportListProps {
  reports: ReportItem[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function ReportList({ reports, selectedId, onSelect, onDelete }: ReportListProps) {
  return (
    <div className="glass-card" style={{ height: '100%', padding: 12, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ fontSize: 14, fontWeight: 600, color: '#1e293b', marginBottom: 12, padding: '0 8px' }}>
        报告列表
      </h3>
      {reports.length === 0 ? (
        <p style={{ color: '#94a3b8', fontSize: 13, textAlign: 'center', padding: 40 }}>
          暂无报告，点击"生成报告"创建
        </p>
      ) : (
        <div style={{ flex: 1, overflow: 'auto' }}>
          {reports.map((r) => {
            const active = selectedId === r.id;
            return (
              <div
                key={r.id}
                onClick={() => onSelect(r.id)}
                style={{
                  padding: '10px 12px',
                  marginBottom: 4,
                  borderRadius: 12,
                  cursor: 'pointer',
                  fontSize: 13,
                  color: '#334155',
                  background: active ? 'rgba(99,102,241,0.1)' : 'transparent',
                  border: active ? '1px solid rgba(99,102,241,0.25)' : '1px solid transparent',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 0.15s',
                }}
              >
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <div style={{ fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {r.topic}
                  </div>
                  <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>
                    {r.createdAt}
                  </div>
                </div>
                <span
                  onClick={(e) => { e.stopPropagation(); onDelete(r.id); }}
                  style={{
                    color: '#cbd5e1',
                    fontSize: 14,
                    cursor: 'pointer',
                    padding: '2px 6px',
                    borderRadius: 4,
                    flexShrink: 0,
                    marginLeft: 8,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#ef4444')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#cbd5e1')}
                >
                  &times;
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
