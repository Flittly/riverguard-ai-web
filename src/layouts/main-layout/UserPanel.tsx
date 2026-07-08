import { useNavigate } from 'react-router-dom';
import { Button, Avatar, Dropdown } from 'antd';
import { UserOutlined, TeamOutlined, ProfileOutlined, SettingOutlined, LogoutOutlined, MenuOutlined } from '@ant-design/icons';
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
        borderRadius: '0 22px 0 0',
        borderTop: '1px solid rgba(30, 64, 175, 0.25)',
        borderLeft: 'none',
        borderBottom: 'none',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Avatar size={32} icon={<UserOutlined />} style={{ background: '#1677ff', flexShrink: 0 }} />
        <div style={{ flex: 1, minWidth: 0, lineHeight: 1.4 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#1e293b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {userInfo?.nickname || userInfo?.username}
          </div>
          <div style={{ fontSize: 11, color: '#94a3b8' }}>
            {userInfo?.roleNames?.join('、') || '—'}
          </div>
        </div>
        <Dropdown menu={{ items: menuItems }} placement="topRight">
          <Button type="text" size="small" icon={<MenuOutlined style={{ color: '#64748b' }} />} />
        </Dropdown>
      </div>
    </div>
  );
}