import { useNavigate, useLocation } from 'react-router-dom';
import { AlertOutlined, FileTextOutlined, CommentOutlined } from '@ant-design/icons';

const pages = [
  { key: '/', label: '预警大屏', icon: AlertOutlined },
  { key: '/report', label: '报告生成', icon: FileTextOutlined },
  { key: '/meeting', label: '险情会商', icon: CommentOutlined },
];

export default function PageNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div style={{ display: 'flex', height: 56, gap: 4, paddingRight: 8 }}>
      {pages.map(({ key, label, icon: Icon }) => {
        const active = location.pathname === key;
        return (
          <button
            key={key}
            onClick={() => navigate(key)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              border: active ? '1px solid rgba(99,102,241,0.3)' : '1px solid transparent',
              background: active ? 'rgba(99,102,241,0.12)' : 'transparent',
              cursor: 'pointer',
              padding: '6px 14px',
              borderRadius: 10,
              transition: 'all 0.2s',
              height: 36,
              alignSelf: 'center',
              fontFamily: 'inherit',
            }}
            onMouseEnter={(e) => {
              if (!active) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.06)';
            }}
            onMouseLeave={(e) => {
              if (!active) (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
            }}
          >
            <Icon style={{ fontSize: 15, color: active ? '#6366F1' : '#64748B' }} />
            <span style={{ fontSize: 13, fontWeight: active ? 600 : 400, color: active ? '#e2e8f0' : '#64748B' }}>
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
