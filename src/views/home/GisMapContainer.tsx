export default function GisMapContainer() {
  return (
    <div
      className="glass-panel-static"
      style={{
        height: '100%',
        minHeight: 460,
        background: '#1A2342',
        border: '1px solid rgba(99,102,241,0.2)',
        borderRadius: 'var(--radius-lg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
      id="map-container"
    >
      {/* grid overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        pointerEvents: 'none',
      }} />

      {/* pulsing dot */}
      <div style={{
        position: 'absolute',
        width: 12, height: 12, borderRadius: '50%',
        background: '#06B6D4',
        boxShadow: '0 0 20px rgba(6,182,212,0.6)',
        animation: 'pulse 2s ease-in-out infinite',
      }} />
      <style>{`
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(6,182,212,0.6); }
          50% { box-shadow: 0 0 40px rgba(6,182,212,0.9), 0 0 60px rgba(99,102,241,0.4); }
        }
      `}</style>

      <div style={{ zIndex: 1, textAlign: 'center' }}>
        <div style={{ fontSize: 36, marginBottom: 12, opacity: 0.6 }}>🗺️</div>
        <p style={{ color: '#94A3B8', fontSize: 14, margin: 0 }}>
          长江流域崩岸风险态势地图
        </p>
        <p style={{ color: '#64748B', fontSize: 12, margin: '4px 0 0' }}>
          预留高德 / Leaflet 接口
        </p>
      </div>
    </div>
  );
}
