import { useAuthStore } from '@/stores/authStore';
import HomeMap from './HomeMap';

export default function HomePage() {
  const { userInfo } = useAuthStore();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div className="glass-card">
        <h2 style={{ fontSize: 18, fontWeight: 600, color: '#1e293b', marginBottom: 16 }}>欢迎使用长江崩岸监测预警系统</h2>
        <p style={{ color: '#64748b', fontSize: 14 }}>
          当前用户：{userInfo?.nickname || userInfo?.username}
          （{userInfo?.roleNames?.join('、')}）
        </p>
      </div>

      <div className='glass-card' style={{ padding: 0, overflow: 'hidden' }}>
        <HomeMap />
      </div>
    </div>
  );
}
