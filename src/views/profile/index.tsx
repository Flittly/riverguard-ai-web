import { Descriptions } from 'antd';
import { useAuthStore } from '@/stores/authStore';

export default function ProfilePage() {
  const { userInfo } = useAuthStore();

  return (
    <div className="glass-panel-static" style={{ padding: 24 }}>
      <h3 style={{ fontSize: 16, fontWeight: 600, color: '#F1F5F9', marginBottom: 16 }}>个人中心</h3>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="用户名">{userInfo?.username}</Descriptions.Item>
        <Descriptions.Item label="昵称">{userInfo?.nickname}</Descriptions.Item>
        <Descriptions.Item label="手机号">{userInfo?.phone || '-'}</Descriptions.Item>
        <Descriptions.Item label="邮箱">{userInfo?.email || '-'}</Descriptions.Item>
        <Descriptions.Item label="角色">{userInfo?.roleNames?.join('、')}</Descriptions.Item>
        <Descriptions.Item label="状态">{userInfo?.status === 1 ? '启用' : '禁用'}</Descriptions.Item>
        <Descriptions.Item label="创建时间">{userInfo?.createTime}</Descriptions.Item>
      </Descriptions>
    </div>
  );
}
