import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import UserPanel from './UserPanel';
import PageNav from './PageNav';

const { Header, Sider, Content } = Layout;

export default function MainLayout() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="glass-nav" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 0 0 24px', height: 56 }}>
        <h2 style={{ color: '#1e293b', fontSize: 16, fontWeight: 600, margin: 0 }}>长江崩岸监测预警</h2>
        <PageNav />
      </Header>
      <Layout>
        <Sider className="glass-sidebar" width={600} style={{ paddingTop: 16 }}>
          <div style={{ position: 'relative', zIndex: 1, padding: '0 12px', color: '#94a3b8', fontSize: 13 }}>
            信息展板（待接入）
          </div>
        </Sider>
        <Content style={{ padding: '16px 20px', background: '#eef1f6' }}>
          <Outlet />
        </Content>
        <Sider className="glass-sidebar" width={600} style={{ paddingTop: 16, borderRight: 'none', borderLeft: '1px solid rgba(255,255,255,0.3)' }}>
          <div style={{ position: 'relative', zIndex: 1, padding: '0 12px', color: '#94a3b8', fontSize: 13 }}>
            信息展板（待接入）
          </div>
        </Sider>
      </Layout>
      <UserPanel />
    </Layout>
  );
}