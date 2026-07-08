import request from '../request';
import type { UserVO } from '@/types/system/user';
import type { PageResult } from '@/types/common';

export interface UserPageQuery {
  page: number;
  size: number;
  keyword?: string;
  status?: number;
}

export interface UserCreateDTO {
  username: string;
  password: string;
  nickname?: string;
  phone?: string;
  email?: string;
}

export interface UserUpdateDTO {
  nickname?: string;
  phone?: string;
  email?: string;
}

export interface AssignRoleDTO {
  roleIds: number[];
}

export function listUsers(params: UserPageQuery) {
  return request.get<unknown, PageResult<UserVO>>('/users', { params });
}

export function createUser(data: UserCreateDTO) {
  return request.post<unknown, void>('/users', data);
}

export function updateUser(id: number, data: UserUpdateDTO) {
  return request.put<unknown, void>(`/users/${id}`, data);
}

export function deleteUser(id: number) {
  return request.delete<unknown, void>(`/users/${id}`);
}

export function assignRoles(id: number, data: AssignRoleDTO) {
  return request.put<unknown, void>(`/users/${id}/roles`, data);
}
