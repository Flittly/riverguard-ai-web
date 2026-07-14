import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import AppRouter from '@/router';

export default function App() {
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif",
          colorPrimary: '#6366F1',
          borderRadius: 10,
          borderRadiusLG: 16,
        },
      }}
    >
      <AppRouter />
    </ConfigProvider>
  );
}
