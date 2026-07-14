import { useNavigate, useLocation } from 'react-router-dom';
import {
  AlertOutlined, FileTextOutlined, CommentOutlined,
  EnvironmentOutlined, DatabaseOutlined, SettingOutlined,
  LogoutOutlined, UserOutlined,
} from '@ant-design/icons';
import { useAuthStore } from '@/stores/authStore';

interface NavItem {
  key: string;
  label: string;
  icon: React.ComponentType<{ style?: React.CSSProperties }>;
}

const topItems: NavItem[] = [
  { key: '/', label: '预警大屏', icon: AlertOutlined },
  { key: '/stations', label: '监测点管理', icon: EnvironmentOutlined },
  { key: '/history', label: '历史数据', icon: DatabaseOutlined },
  { key: '/report', label: '报告生成', icon: FileTextOutlined },
  { key: '/meeting', label: '险情会商', icon: CommentOutlined },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userInfo, logout } = useAuthStore();

  const isActive = (key: string) => {
    if (key === '/') return location.pathname === '/';
    return location.pathname.startsWith(key);
  };

  return (
    <div style={{
      position: 'fixed',
      left: 0,
      top: 0,
      bottom: 0,
      width: 240,
      background: 'rgba(11, 17, 36, 0.92)',
      backdropFilter: 'blur(24px)',
      borderRight: '1px solid rgba(255, 255, 255, 0.06)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      zIndex: 200,
      padding: '24px 12px 20px',
      color: '#94A3B8',
    }}>
      {/* Top: Logo + Nav */}
      <div>
        {/* Logo */}
        <div
          onClick={() => navigate('/')}
          style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '0 6px 24px',
            cursor: 'pointer',
          }}
        >
          <div style={{
            width: 34, height: 34, borderRadius: 10,
            background: 'linear-gradient(135deg, #6366F1, #06B6D4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 15, fontWeight: 700, color: '#fff', flexShrink: 0,
          }}>
            R
          </div>
          <span style={{
            color: '#F1F5F9',
            fontSize: 15,
            fontWeight: 600,
            letterSpacing: 0.5,
            whiteSpace: 'nowrap',
          }}>
            长江监测
          </span>
        </div>

        {/* Nav items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {topItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.key);
            return (
              <button
                key={item.key}
                onClick={() => navigate(item.key)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  border: 'none',
                  background: active ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                  borderRadius: 12,
                  padding: '10px 14px',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontSize: 14,
                  fontWeight: active ? 600 : 400,
                  color: active ? '#C7D2FE' : '#94A3B8',
                  transition: 'all 0.2s',
                  width: '100%',
                  textAlign: 'left',
                }}
                onMouseEnter={(e) => {
                  if (!active) { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#E2E8F0'; }
                }}
                onMouseLeave={(e) => {
                  if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#94A3B8'; }
                }}
              >
                <Icon style={{ fontSize: 18 }} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom: User */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '16px 6px 0',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '8px', borderRadius: 12,
          marginBottom: 4,
        }}>
          <div style={{
            width: 34, height: 34, borderRadius: 10,
            background: 'linear-gradient(135deg, #6366F1, #06B6D4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <UserOutlined style={{ color: '#fff', fontSize: 14 }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontSize: 13, fontWeight: 600, color: '#F1F5F9',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
              {userInfo?.nickname || userInfo?.username || '值班员'}
            </div>
            <div style={{ fontSize: 11, color: '#64748B' }}>
              {userInfo?.roleNames?.join('、') || '值班员'}
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate('/profile')}
          style={{
            display: 'flex', alignItems: 'center', gap: 10,
            border: 'none',
            background: 'transparent',
            borderRadius: 10,
            padding: '8px 8px',
            cursor: 'pointer',
            fontFamily: 'inherit',
            fontSize: 13,
            color: '#64748B',
            width: '100%',
            textAlign: 'left',
            transition: 'all 0.15s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = '#E2E8F0'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#64748B'; }}
        >
          <SettingOutlined style={{ fontSize: 16 }} />
          <span>系统设置</span>
        </button>

        <button
          onClick={logout}
          style={{
            display: 'flex', alignItems: 'center', gap: 10,
            border: 'none',
            background: 'transparent',
            borderRadius: 10,
            padding: '8px 8px',
            cursor: 'pointer',
            fontFamily: 'inherit',
            fontSize: 13,
            color: '#64748B',
            width: '100%',
            textAlign: 'left',
            transition: 'all 0.15s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(239,68,68,0.1)'; e.currentTarget.style.color = '#FCA5A5'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#64748B'; }}
        >
          <LogoutOutlined style={{ fontSize: 16 }} />
          <span>退出登录</span>
        </button>
      </div>
    </div>
  );
}
