export interface UserVO {
  id: number;
  username: string;
  nickname: string;
  phone: string;
  email: string;
  status: number;
  roleCodes: string[];
  roleNames: string[];
  createTime: string;
}

export interface LoginVO {
  token: string;
  userInfo: UserVO;
}
