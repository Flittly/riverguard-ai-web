import { useNavigate, useLocation } from 'react-router-dom';
import { AlertOutlined, FileTextOutlined, CommentOutlined } from '@ant-design/icons';

const pages = [
  { key: '/', label: '预警大屏', icon: AlertOutlined, bg: 'rgba(147, 197, 253, 0.22)' },
  { key: '/report', label: '报告生成', icon: FileTextOutlined, bg: 'rgba(134, 239, 172, 0.22)' },
  { key: '/meeting', label: '险情会商', icon: CommentOutlined, bg: 'rgba(253, 230, 138, 0.22)' },
];

export default function PageNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div style={{ display: 'flex', height: 56, width: 600 }}>
      {pages.map(({ key, label, icon: Icon, bg }) => {
        const active = location.pathname === key;
        return (
          <button
            key={key}
            onClick={() => navigate(key)}
            style={{
              flex: 1,
              border: 'none',
              borderRight: '1px solid rgba(255,255,255,0.35)',
              background: active ? bg : 'transparent',
              backdropFilter: 'blur(12px)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              transition: 'background 0.2s',
              height: 56,
              borderRadius: 0,
            }}
            onMouseEnter={(e) => {
              if (!active) (e.currentTarget as HTMLButtonElement).style.background = bg;
            }}
            onMouseLeave={(e) => {
              if (!active) (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
            }}
          >
            <Icon style={{ fontSize: 18, color: active ? '#1e293b' : '#64748b' }} />
            <span style={{ fontSize: 11, fontWeight: active ? 600 : 400, color: active ? '#1e293b' : '#64748b' }}>
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
