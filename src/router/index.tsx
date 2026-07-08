import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthGuard from '@/components/auth/AuthGuard';
import MainLayout from '@/layouts/main-layout';
import LoginPage from '@/views/login';
import HomePage from '@/views/home';
import ReportPage from '@/views/report';
import MeetingPage from '@/views/meeting';
import UserPage from '@/views/system/user';
import ProfilePage from '@/views/profile';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<AuthGuard />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/report" element={<ReportPage />} />
            <Route path="/meeting" element={<MeetingPage />} />
            <Route path="/system/user" element={<UserPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
