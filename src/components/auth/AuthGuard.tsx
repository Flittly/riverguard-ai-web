import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { useEffect } from 'react';
import { Spin } from 'antd';

export default function AuthGuard() {
  const { token, userInfo, fetchUserInfo, loading } = useAuthStore();

  useEffect(() => {
    if (token && !userInfo) {
      fetchUserInfo();
    }
  }, [token, userInfo, fetchUserInfo]);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!userInfo || loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  return <Outlet />;
}
