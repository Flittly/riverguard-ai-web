import { Outlet, useLocation } from 'react-router-dom';
import { Layout, Avatar, Dropdown, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  UserOutlined, TeamOutlined, ProfileOutlined, SettingOutlined, LogoutOutlined, MoreOutlined,
  AlertOutlined, FileTextOutlined, CommentOutlined,
} from '@ant-design/icons';
import { useAuthStore } from '@/stores/authStore';
import type { MenuProps } from 'antd';

const { Header, Sider, Content } = Layout;

const FULLSCREEN_ROUTES = ['/report'];

const pages = [
  { key: '/', label: '预警大屏', icon: AlertOutlined },
  { key: '/report', label: '报告生成', icon: FileTextOutlined },
  { key: '/meeting', label: '险情会商', icon: CommentOutlined },
];

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

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
      <span style={{ fontSize: 13, color: '#64748b', maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {userInfo?.nickname || userInfo?.username}
      </span>
      <Dropdown menu={{ items: menuItems }} placement="bottomRight">
        <Avatar
          size={30}
          icon={<UserOutlined />}
          style={{ background: 'linear-gradient(135deg, #6366F1, #06B6D4)', cursor: 'pointer', flexShrink: 0 }}
        />
      </Dropdown>
    </div>
  );
}

function NavButtons() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div style={{ display: 'flex', gap: 2 }}>
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
              border: 'none',
              background: active ? 'rgba(99,102,241,0.1)' : 'transparent',
              cursor: 'pointer',
              padding: '6px 16px',
              borderRadius: 20,
              transition: 'all 0.2s',
              height: 36,
              fontFamily: 'inherit',
              fontSize: 13,
              fontWeight: active ? 600 : 400,
              color: active ? '#6366F1' : '#64748b',
            }}
            onMouseEnter={(e) => {
              if (!active) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(148,163,184,0.1)';
            }}
            onMouseLeave={(e) => {
              if (!active) (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
            }}
          >
            <Icon style={{ fontSize: 15 }} />
            {label}
          </button>
        );
      })}
    </div>
  );
}

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
          justifyContent: 'center',
          padding: '0 16px',
          position: 'relative',
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
          maxWidth: 1100,
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

      <Layout style={{ background: 'transparent' }}>
        {!isFullscreen && (
          <Sider className="glass-sidebar" width={600} style={{ paddingTop: 16 }}>
            <div style={{ position: 'relative', zIndex: 1, padding: '0 12px', color: '#94a3b8', fontSize: 13 }}>
              信息展板（待接入）
            </div>
          </Sider>
        )}
        <Content style={isFullscreen ? { background: '#eef1f6' } : { padding: '16px 20px', background: 'transparent' }}>
          <Outlet />
        </Content>
        {!isFullscreen && (
          <Sider className="glass-sidebar" width={600} style={{ paddingTop: 16, borderRight: 'none', borderLeft: '1px solid rgba(255,255,255,0.3)' }}>
            <div style={{ position: 'relative', zIndex: 1, padding: '0 12px', color: '#94a3b8', fontSize: 13 }}>
              信息展板（待接入）
            </div>
          </Sider>
        )}
      </Layout>
    </Layout>
  );
}
