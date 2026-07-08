import { useNavigate } from 'react-router-dom';
import { Button, Avatar, Tooltip, Divider } from 'antd';
import { UserOutlined, ProfileOutlined, LogoutOutlined } from '@ant-design/icons';
import { useAuthStore } from '@/stores/authStore';

export default function UserPanel() {
  const navigate = useNavigate();
  const { userInfo, logout } = useAuthStore();

  return (
    <div
      className="glass"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        zIndex: 1000,
        width: 200,
        padding: '16px 12px',
        borderRadius: '0 22px 0 0',
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
      </div>
      <Divider style={{ margin: '10px 0 8px' }} />
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Tooltip title="个人中心">
          <Button type="text" size="small" icon={<ProfileOutlined />} onClick={() => navigate('/profile')}>个人</Button>
        </Tooltip>
        <Tooltip title="退出登录">
          <Button type="text" size="small" danger icon={<LogoutOutlined />} onClick={logout}>退出</Button>
        </Tooltip>
      </div>
    </div>
  );
}