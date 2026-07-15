import { useState } from 'react';

export default function WarningRiskPanel() {
  const [tab, setTab] = useState<'monthly' | 'annually'>('monthly');

  const riskLevels = [
    { label: '高风险', count: 5, color: '#EF4444', pct: 28 },
    { label: '中风险', count: 8, color: '#F59E0B', pct: 44 },
    { label: '低风险', count: 5, color: '#10B981', pct: 28 },
  ];

  return (
    <div className="glass-panel-static" style={{ padding: 20, marginBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h3 style={{
          fontSize: 17, fontWeight: 700, color: '#1e293b', margin: 0,
          background: 'rgba(99,102,241,0.08)',
          padding: '4px 16px',
          borderRadius: '22px 0 22px 0',
          display: 'inline-block',
          lineHeight: '1.3',
          transform: 'translate(-21px, -21px)',
        }}>预警风险统计</h3>
        <div style={{ display: 'flex', background: 'rgba(0,0,0,0.04)', borderRadius: 10, padding: 2 }}>
          {[{ key: 'monthly' as const, label: '月度' }, { key: 'annually' as const, label: '年度' }].map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{
              border: 'none',
              background: tab === t.key ? 'rgba(99,102,241,0.12)' : 'transparent',
              color: tab === t.key ? '#6366F1' : '#94a3b8',
              padding: '5px 14px', borderRadius: 8, cursor: 'pointer',
              fontSize: 12, fontWeight: tab === t.key ? 600 : 400,
              fontFamily: 'inherit', transition: 'all 0.2s',
            }}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 4 }}>累计预警</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#1e293b' }}>18</div>
        </div>
        <div style={{ flex: 1 }}>
          {riskLevels.map((r) => (
            <div key={r.label} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 12, color: '#64748b', width: 48 }}>{r.label}</span>
              <div style={{ flex: 1, height: 6, borderRadius: 3, background: 'rgba(0,0,0,0.06)', overflow: 'hidden' }}>
                <div style={{ width: `${r.pct}%`, height: '100%', borderRadius: 3, background: r.color }} />
              </div>
              <span style={{ fontSize: 12, color: '#94a3b8', width: 24, textAlign: 'right' }}>{r.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
