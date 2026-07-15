export default function WaterLevelPanel() {
  return (
    <div className="glass-panel-static" style={{ padding: 20 }}>
      <h3 style={{
        fontSize: 17, fontWeight: 700, color: '#1e293b', margin: '0 0 8px',
        background: 'rgba(6,182,212,0.08)',
        padding: '4px 16px',
        borderRadius: '22px 0 22px 0',
        display: 'inline-block',
        lineHeight: '1.3',
        transform: 'translate(-21px, -21px)',
      }}>今日水位极值</h3>
      <p style={{ fontSize: 12, color: '#94a3b8', margin: '0 0 18px' }}>长江中游荆江河段</p>

      <div style={{ fontSize: 38, fontWeight: 800, color: '#1e293b', marginBottom: 4 }}>
        460.00<span style={{ fontSize: 20, fontWeight: 500, color: '#94a3b8', marginLeft: 4 }}>mm</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
        <span style={{ fontSize: 13, color: '#10b981' }}>↑ 15%</span>
        <span style={{ fontSize: 12, color: '#94a3b8' }}>较昨日上涨</span>
      </div>

      <div style={{
        background: 'rgba(255,255,255,0.5)',
        borderRadius: 14,
        padding: '14px 16px',
        border: '1px solid rgba(0,0,0,0.06)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 2 }}>警戒水位差</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#d97706' }}>4.36 m</div>
          </div>
          <div style={{
            width: 40, height: 40, borderRadius: 12,
            background: 'rgba(245,158,11,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18,
          }}>
            ⚠
          </div>
        </div>
      </div>
    </div>
  );
}
