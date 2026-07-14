interface SectionCardProps {
  label: string;
  code: string;
  value: number;
  unit: string;
  change: number;
  changeLabel: string;
  index: number;
}

export default function SectionCards() {
  const sections: SectionCardProps[] = [
    { label: '断面 A (观音阁)', code: 'GYG', value: 22332, unit: 'mm', change: 4.21, changeLabel: '今日变化量', index: 0 },
    { label: '断面 B (七里河)', code: 'QLH', value: 12452, unit: 'mm', change: -1.02, changeLabel: '今日变化量', index: 1 },
    { label: '断面 C (杨家厂)', code: 'YJC', value: 6743, unit: 'mm', change: -1.02, changeLabel: '今日变化量', index: 2 },
  ];

  const tints = [
    'radial-gradient(ellipse at 100% 0%, rgba(99,102,241,0.12), transparent 60%)',
    'radial-gradient(ellipse at 100% 0%, rgba(16,185,129,0.12), transparent 60%)',
    'radial-gradient(ellipse at 100% 0%, rgba(245,158,11,0.12), transparent 60%)',
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 16 }}>
      {sections.map((s) => {
        const isUp = s.change >= 0;
        return (
          <div key={s.code} className="glass-panel" style={{ padding: '22px 24px', overflow: 'hidden' }}>
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              background: tints[s.index],
            }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{s.label}</div>
                  <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>{s.code}</div>
                </div>
                <div style={{
                  width: 36, height: 36, borderRadius: 12,
                  background: isUp ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 16, fontWeight: 700,
                  color: isUp ? '#10b981' : '#ef4444',
                }}>
                  {isUp ? '↑' : '↓'}
                </div>
              </div>

              <div style={{ fontSize: 36, fontWeight: 800, color: '#1e293b', lineHeight: 1.1, marginBottom: 4 }}>
                {s.value.toLocaleString()}
                <span style={{ fontSize: 18, fontWeight: 500, color: '#94a3b8', marginLeft: 4 }}>{s.unit}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: isUp ? '#10b981' : '#ef4444' }}>
                  {isUp ? '+' : ''}{s.change}%
                </span>
                <span style={{ fontSize: 12, color: '#94a3b8' }}>{s.changeLabel}</span>
              </div>

              <div style={{ display: 'flex', gap: 3, alignItems: 'flex-end', height: 24 }}>
                {[6, 12, 8, 15, 10, 18, 9, 14, 11, 7, s.index === 0 ? 17 : s.index === 1 ? 13 : 16].map((h, i) => (
                  <div key={i} style={{
                    flex: 1, height: `${h}px`, borderRadius: 3,
                    background: isUp
                      ? 'linear-gradient(180deg, rgba(16,185,129,0.5), rgba(16,185,129,0.1))'
                      : 'linear-gradient(180deg, rgba(99,102,241,0.5), rgba(99,102,241,0.1))',
                  }} />
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
