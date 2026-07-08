import { useAuthStore } from '@/stores/authStore';
import HomeMap from './HomeMap';
import HomeStats from './HomeStats';

export default function HomePage() {
  const { userInfo } = useAuthStore();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div className="glass-card">
        <h2 style={{ fontSize: 18, fontWeight: 600, color: '#1e293b', marginBottom: 8 }}>现场实时智能预警大屏</h2>
        <p style={{ color: '#64748b', fontSize: 14 }}>
          当前用户：{userInfo?.nickname || userInfo?.username}
          （{userInfo?.roleNames?.join('、')}）
        </p>
      </div>

      <div className='glass-card' style={{ padding: 0, overflow: 'hidden' }}>
        <HomeMap />
      </div>

      <HomeStats />
    </div>
  );
}
