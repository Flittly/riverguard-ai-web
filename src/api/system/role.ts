import request from '../request';
import type { RoleVO } from '@/types/system/role';

export function getManageableRoles() {
  return request.get<unknown, RoleVO[]>('/roles/scopes');
}
