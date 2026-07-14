import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Layout, Avatar, Dropdown } from 'antd';
import {
  TeamOutlined, ProfileOutlined, SettingOutlined, LogoutOutlined,
  AlertOutlined, FileTextOutlined, CommentOutlined,
  MailOutlined, BellOutlined, SearchOutlined,
  SwapOutlined,
} from '@ant-design/icons';
import { useAuthStore } from '@/stores/authStore';
import type { MenuProps } from 'antd';

const { Header, Content } = Layout;

const pages = [
  { key: '/', label: '预警大屏', icon: AlertOutlined },
  { key: '/report', label: '报告生成', icon: FileTextOutlined },
  { key: '/meeting', label: '险情会商', icon: CommentOutlined },
];

function NavButtons() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div style={{ display: 'flex', gap: 4 }}>
      {pages.map(({ key, label, icon: Icon }) => {
        const active = location.pathname === key;
        return (
          <button
            key={key}
            onClick={() => navigate(key)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              border: 'none',
              background: active ? '#1e293b' : 'transparent',
              cursor: 'pointer',
              padding: '6px 16px',
              borderRadius: 999,
              transition: 'all 0.2s',
              height: 36,
              fontFamily: 'inherit',
              fontSize: 13,
              fontWeight: active ? 600 : 400,
              color: active ? '#ffffff' : '#64748b',
            }}
            onMouseEnter={(e) => {
              if (!active) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(148,163,184,0.1)';
            }}
            onMouseLeave={(e) => {
              if (!active) (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
            }}
          >
            <Icon style={{ fontSize: 15, color: active ? '#ffffff' : '#64748b' }} />
            {label}
          </button>
        );
      })}
    </div>
  );
}

function UserMenu() {
  const navigate = useNavigate();
  const { userInfo, manageableRoles, logout } = useAuthStore();

  const menuItems: MenuProps['items'] = [
    { key: 'profile', icon: <ProfileOutlined />, label: '个人中心', onClick: () => navigate('/profile') },
    { key: 'settings', icon: <SettingOutlined />, label: '系统设置' },
    ...(manageableRoles.includes('SUPER_ADMIN') || manageableRoles.includes('ADMIN')
      ? [{ key: 'users', icon: <TeamOutlined />, label: '用户管理', onClick: () => navigate('/system/user') }] as MenuProps['items']
      : []),
    { type: 'divider' as const },
    { key: 'logout', icon: <LogoutOutlined />, label: '退出登录', onClick: logout, danger: true },
  ];

  const nickname = userInfo?.nickname || userInfo?.username || '值班员';
  const email = userInfo?.email || 'admin@riverguard.cn';

  const iconBtnStyle: React.CSSProperties = {
    width: 30, height: 30, borderRadius: '50%',
    border: 'none',
    background: 'rgba(148,163,184,0.1)',
    cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'all 0.15s',
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
      <button
        style={iconBtnStyle}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(148,163,184,0.2)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(148,163,184,0.1)'; }}
      >
        <MailOutlined style={{ fontSize: 14, color: '#64748b' }} />
      </button>

      <button
        style={iconBtnStyle}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(148,163,184,0.2)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(148,163,184,0.1)'; }}
      >
        <BellOutlined style={{ fontSize: 14, color: '#64748b' }} />
      </button>

      <button
        style={iconBtnStyle}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(148,163,184,0.2)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(148,163,184,0.1)'; }}
      >
        <SearchOutlined style={{ fontSize: 14, color: '#64748b' }} />
      </button>

      <div style={{ width: 1, height: 24, background: 'rgba(0,0,0,0.08)', margin: '0 4px' }} />

      <Dropdown menu={{ items: menuItems }} placement="bottomRight">
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          cursor: 'pointer', padding: '2px 2px',
        }}>
          <Avatar
            size={32}
            icon={<TeamOutlined />}
            style={{
              background: 'linear-gradient(135deg, #6366F1, #06B6D4)',
              flexShrink: 0,
            }}
          />
          <div style={{ lineHeight: 1.3, minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#1e293b', whiteSpace: 'nowrap' }}>
              {nickname}
            </div>
            <div style={{ fontSize: 10, color: '#94a3b8', whiteSpace: 'nowrap' }}>
              {email}
            </div>
          </div>
        </div>
      </Dropdown>

      <button
        title="切换用户"
        style={{
          ...iconBtnStyle,
          marginLeft: 2,
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(148,163,184,0.25)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(148,163,184,0.1)'; }}
      >
        <SwapOutlined style={{ fontSize: 14, color: '#64748b', transform: 'rotate(90deg)' }} />
      </button>
    </div>
  );
}

const FULLSCREEN_ROUTES = ['/report'];

export default function MainLayout() {
  const location = useLocation();
  const isFullscreen = FULLSCREEN_ROUTES.includes(location.pathname);

  return (
    <Layout style={{ minHeight: '100vh', background: '#eef1f6' }}>
      <Header
        style={{
          background: 'transparent',
          height: 72,
          display: 'flex',
          alignItems: 'center',
          padding: '0 24px',
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 48,
          background: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(20px)',
          borderRadius: 999,
          border: '1px solid rgba(255,255,255,0.6)',
          boxShadow: '0 2px 16px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.03)',
          padding: '0 8px 0 16px',
          width: '100%',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            <div style={{
              width: 30, height: 30, borderRadius: 9,
              background: 'linear-gradient(135deg, #6366F1, #06B6D4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, fontWeight: 700, color: '#fff',
            }}>
              R
            </div>
            <span style={{ color: '#1e293b', fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap', letterSpacing: 0.5 }}>
              长江崩岸监测预警
            </span>
          </div>

          <NavButtons />

          <UserMenu />
        </div>
      </Header>

      <Content style={isFullscreen ? { padding: '8px', background: '#eef1f6' } : { padding: '16px 24px', background: 'transparent' }}>
        <Outlet />
      </Content>
    </Layout>
  );
}
