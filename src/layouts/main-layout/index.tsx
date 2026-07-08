import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { HomeOutlined, TeamOutlined } from '@ant-design/icons';
import { useAuthStore } from '@/stores/authStore';
import UserPanel from './UserPanel';

const { Header, Sider, Content } = Layout;

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { manageableRoles } = useAuthStore();

  const menuItems = [
    { key: '/', icon: <HomeOutlined />, label: '首页' },
    ...(manageableRoles.includes('SUPER_ADMIN') || manageableRoles.includes('ADMIN')
      ? [{ key: '/system/user', icon: <TeamOutlined />, label: '用户管理' }]
      : []),
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="glass-nav" style={{ display: 'flex', alignItems: 'center', padding: '0 24px', height: 56 }}>
        <h2 style={{ color: '#1e293b', fontSize: 16, fontWeight: 600, margin: 0 }}>长江崩岸监测预警</h2>
      </Header>
      <Layout>
        <Sider className="glass-sidebar" width={200} style={{ paddingTop: 16 }}>
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            items={menuItems}
            onClick={({ key }) => navigate(key)}
            style={{ background: 'transparent', border: 'none', position: 'relative', zIndex: 1 }}
          />
        </Sider>
        <Content style={{ padding: 24, background: '#eef1f6' }}>
          <Outlet />
        </Content>
      </Layout>
      <UserPanel />
    </Layout>
  );
}