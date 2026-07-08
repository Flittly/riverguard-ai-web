import { create } from 'zustand';
import type { UserVO } from '@/types/system/user';
import { login as loginApi, getCurrentUser, logout as logoutApi } from '@/api/system/auth';

interface AuthState {
  token: string | null;
  userInfo: UserVO | null;
  manageableRoles: string[];
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  fetchUserInfo: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('token'),
  userInfo: null,
  manageableRoles: [],
  loading: false,

  login: async (username, password) => {
    set({ loading: true });
    try {
      const res = await loginApi(username, password);
      localStorage.setItem('token', res.token);
      set({ token: res.token, userInfo: res.userInfo, loading: false });
    } catch {
      set({ loading: false });
      throw new Error('登录失败');
    }
  },

  logout: async () => {
    try {
      await logoutApi();
    } finally {
      localStorage.removeItem('token');
      set({ token: null, userInfo: null, manageableRoles: [] });
      window.location.href = '/login';
    }
  },

  fetchUserInfo: async () => {
    try {
      const userInfo = await getCurrentUser();
      const codes = userInfo.roleCodes || [];
      set({ userInfo, manageableRoles: codes });
    } catch {
      localStorage.removeItem('token');
      set({ token: null, userInfo: null });
    }
  },
}));
