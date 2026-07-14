import { useNavigate } from 'react-router-dom';
import { Button, Avatar, Dropdown } from 'antd';
import { UserOutlined, TeamOutlined, ProfileOutlined, SettingOutlined, LogoutOutlined, MoreOutlined } from '@ant-design/icons';
import { useAuthStore } from '@/stores/authStore';
import type { MenuProps } from 'antd';

export default function UserPanel() {
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
    <div
      className="glass"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        zIndex: 1000,
        width: 600,
        padding: '14px 12px',
        borderRadius: '0 24px 0 0',
        borderTop: '1px solid rgba(99,102,241,0.15)',
        borderLeft: 'none',
        borderBottom: 'none',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.3)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Avatar
          size={32}
          icon={<UserOutlined />}
          style={{
            background: 'linear-gradient(135deg, #6366F1, #06B6D4)',
            flexShrink: 0,
          }}
        />
        <div style={{ flex: 1, minWidth: 0, lineHeight: 1.4 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {userInfo?.nickname || userInfo?.username}
          </div>
          <div style={{ fontSize: 11, color: '#64748B' }}>
            {userInfo?.roleNames?.join('、') || '—'}
          </div>
        </div>
        <Dropdown menu={{ items: menuItems }} placement="topRight">
          <Button
            type="text"
            size="small"
            icon={<MoreOutlined style={{ color: '#64748B' }} />}
          />
        </Dropdown>
      </div>
    </div>
  );
}
