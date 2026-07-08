import request from '../request';
import type { LoginVO, UserVO } from '@/types/system/user';

export function login(username: string, password: string) {
  return request.post<unknown, LoginVO>('/auth/login', { username, password });
}

export function getCurrentUser() {
  return request.get<unknown, UserVO>('/auth/me');
}

export function logout() {
  return request.post<unknown, void>('/auth/logout');
}
