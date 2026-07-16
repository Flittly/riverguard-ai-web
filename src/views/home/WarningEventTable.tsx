export default function WarningEventTable() {
  const events = [
    { name: '观音阁断面位移超标', date: '2026-07-13', time: '2h内', level: '高' as const },
    { name: '七里河岸坡裂缝扩大', date: '2026-07-12', time: '4h内', level: '高' as const },
    { name: '杨家厂水位接近警戒线', date: '2026-07-12', time: '6h内', level: '中' as const },
    { name: '调关段传感器离线', date: '2026-07-11', time: '立即', level: '中' as const },
    { name: '石首弯道水流异常', date: '2026-07-10', time: '12h内', level: '低' as const },
    { name: '监利段雨量达预警阈值', date: '2026-07-10', time: '8h内', level: '低' as const },
    { name: '洪湖段巡查发现渗水', date: '2026-07-09', time: '24h内', level: '中' as const },
  ];

  const levelColor: Record<string, string> = { 高: '#ef4444', 中: '#d97706', 低: '#10b981' };

  return (
    <div className="glass-panel-static" style={{ padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h3 style={{
          fontSize: 17, fontWeight: 700, color: '#1e293b', margin: 0,
          background: 'rgba(245,158,11,0.08)',
          padding: '10px 16px',
          borderRadius: '22px 0 22px 0',
          display: 'inline-block',
          lineHeight: '1.3',
          transform: 'translate(-21px, -21px)',
        }}>预警事件</h3>
        <span style={{ fontSize: 12, color: '#6366F1', cursor: 'pointer' }}>查看全部 →</span>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 0.8fr',
        padding: '8px 12px', fontSize: 11, color: '#94a3b8', fontWeight: 500,
        borderBottom: '1px solid rgba(0,0,0,0.06)',
      }}>
        <span>事件名称</span><span>发生时间</span><span>处置时限</span><span>风险等级</span>
      </div>

      {events.map((e, i) => (
        <div key={i} style={{
          display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 0.8fr',
          padding: '10px 12px', fontSize: 13, color: '#64748b',
          background: i % 2 === 0 ? 'rgba(0,0,0,0.02)' : 'transparent',
          borderRadius: 10, transition: 'background 0.15s', cursor: 'default',
        }}
          onMouseEnter={(ev) => { ev.currentTarget.style.background = 'rgba(99,102,241,0.06)'; }}
          onMouseLeave={(ev) => { ev.currentTarget.style.background = i % 2 === 0 ? 'rgba(0,0,0,0.02)' : 'transparent'; }}
        >
          <span style={{ color: '#334155' }}>{e.name}</span>
          <span>{e.date}</span>
          <span>{e.time}</span>
          <span style={{ color: levelColor[e.level], fontWeight: 600 }}>{e.level}</span>
        </div>
      ))}
    </div>
  );
}
