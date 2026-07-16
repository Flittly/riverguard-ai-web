import { create } from 'zustand';
import type { UserVO } from '@/types/system/user';
import { login as loginApi, getCurrentUser, logout as logoutApi } from '@/api/system/auth';

interface SavedAccount {
  token: string;
  username: string;
  nickname: string;
  email: string;
}

interface AuthState {
  token: string | null;
  userInfo: UserVO | null;
  manageableRoles: string[];
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  fetchUserInfo: () => Promise<void>;
  getSavedAccounts: () => SavedAccount[];
  switchAccount: (token: string) => Promise<void>;
}

function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

function loadAccounts(): SavedAccount[] {
  try {
    const raw = localStorage.getItem('saved_accounts');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveAccounts(accounts: SavedAccount[]) {
  localStorage.setItem('saved_accounts', JSON.stringify(accounts));
}

function upsertAccount(accounts: SavedAccount[], account: SavedAccount): SavedAccount[] {
  const idx = accounts.findIndex(a => a.username === account.username);
  if (idx >= 0) {
    const updated = [...accounts];
    updated[idx] = account;
    return updated;
  }
  return [account, ...accounts];
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: localStorage.getItem('token'),
  userInfo: null,
  manageableRoles: [],
  loading: false,

  login: async (username, password) => {
    set({ loading: true });
    try {
      const res = await loginApi(username, password);
      localStorage.setItem('token', res.token);

      const account: SavedAccount = {
        token: res.token,
        username: res.userInfo.username,
        nickname: res.userInfo.nickname,
        email: res.userInfo.email,
      };
      const accounts = upsertAccount(loadAccounts(), account);
      saveAccounts(accounts);

      set({ token: res.token, userInfo: res.userInfo, loading: false });
    } catch {
      set({ loading: false });
      throw new Error('登录失败');
    }
  },

  logout: async () => {
    try { await logoutApi(); } catch { /* ignore */ }
    const token = localStorage.getItem('token');
    if (token) {
      const accounts = loadAccounts().filter(a => a.token !== token);
      saveAccounts(accounts);
    }
    localStorage.removeItem('token');
    set({ token: null, userInfo: null, manageableRoles: [] });
    window.location.href = '/login';
  },

  fetchUserInfo: async () => {
    try {
      const userInfo = await getCurrentUser();
      const codes = userInfo.roleCodes || [];
      const token = localStorage.getItem('token');
      if (token) {
        const account: SavedAccount = {
          token,
          username: userInfo.username,
          nickname: userInfo.nickname,
          email: userInfo.email,
        };
        saveAccounts(upsertAccount(loadAccounts(), account));
      }
      set({ userInfo, manageableRoles: codes });
    } catch {
      localStorage.removeItem('token');
      set({ token: null, userInfo: null });
    }
  },

  getSavedAccounts: () => {
    const currentToken = localStorage.getItem('token');
    return loadAccounts().filter(
      a => a.token !== currentToken && !isTokenExpired(a.token)
    );
  },

  switchAccount: async (token: string) => {
    localStorage.setItem('token', token);
    set({ token, userInfo: null });
    try {
      const userInfo = await getCurrentUser();
      const codes = userInfo.roleCodes || [];
      const account: SavedAccount = {
        token,
        username: userInfo.username,
        nickname: userInfo.nickname,
        email: userInfo.email,
      };
      saveAccounts(upsertAccount(loadAccounts(), account));
      set({ userInfo, manageableRoles: codes });
    } catch {
      localStorage.removeItem('token');
      set({ token: null, userInfo: null, manageableRoles: [] });
      window.location.href = '/login';
    }
  },
}));
