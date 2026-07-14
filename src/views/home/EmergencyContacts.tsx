import { PhoneOutlined } from '@ant-design/icons';

export default function EmergencyContacts() {
  const contacts = [
    { name: '张建国', title: '总指挥长', phone: '139-7100-1234' },
    { name: '李明辉', title: '技术负责人', phone: '138-7200-5678' },
    { name: '王海燕', title: '监测工程师', phone: '137-7300-9012' },
    { name: '赵志强', title: '巡查队长', phone: '136-7400-3456' },
  ];

  return (
    <div className="glass-panel-static" style={{ padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: '#1e293b', margin: 0 }}>应急通讯录</h3>
        <span style={{ fontSize: 12, color: '#06B6D4', cursor: 'pointer' }}>全部</span>
      </div>

      {contacts.map((c, i) => (
        <div key={i} style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '10px 0',
          borderBottom: i < contacts.length - 1 ? '1px solid rgba(0,0,0,0.04)' : 'none',
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: 12,
            background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(6,182,212,0.1))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, fontWeight: 600, color: '#6366F1', flexShrink: 0,
          }}>
            {c.name[0]}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{c.name}</div>
            <div style={{ fontSize: 11, color: '#94a3b8' }}>{c.title} · {c.phone}</div>
          </div>
          <button style={{
            width: 34, height: 34, borderRadius: 10,
            border: '1px solid rgba(0,0,0,0.08)',
            background: 'rgba(0,0,0,0.02)',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s',
            fontFamily: 'inherit',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(16,185,129,0.12)'; e.currentTarget.style.borderColor = '#10b981'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.02)'; e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)'; }}
          >
            <PhoneOutlined style={{ color: '#10b981', fontSize: 13 }} />
          </button>
        </div>
      ))}
    </div>
  );
}
