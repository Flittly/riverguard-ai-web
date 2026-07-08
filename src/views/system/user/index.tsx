import { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, Popconfirm, Space, message, Tag } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { listUsers, createUser, updateUser, deleteUser, assignRoles } from '@/api/system/user';
import { getManageableRoles } from '@/api/system/role';
import type { UserVO } from '@/types/system/user';
import type { RoleVO } from '@/types/system/role';
import type { PageResult } from '@/types/common';

export default function UserPage() {
  const [data, setData] = useState<PageResult<UserVO> | null>(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserVO | null>(null);
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [roleUser, setRoleUser] = useState<UserVO | null>(null);
  const [roles, setRoles] = useState<RoleVO[]>([]);
  const [form] = Form.useForm();
  const [roleForm] = Form.useForm();

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await listUsers({ page, size });
      setData(res);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, size]);

  const handleCreate = () => {
    setEditingUser(null);
    form.resetFields();
    setModalOpen(true);
  };

  const handleEdit = (record: UserVO) => {
    setEditingUser(record);
    form.setFieldsValue(record);
    setModalOpen(true);
  };

  const handleSubmit = async () => {
    const values = await form.validateFields();
    if (editingUser) {
      await updateUser(editingUser.id, values);
      message.success('更新成功');
    } else {
      await createUser(values);
      message.success('创建成功');
    }
    setModalOpen(false);
    fetchData();
  };

  const handleDelete = async (id: number) => {
    await deleteUser(id);
    message.success('删除成功');
    fetchData();
  };

  const handleRoleOpen = async (record: UserVO) => {
    setRoleUser(record);
    const res = await getManageableRoles();
    setRoles(res);
    roleForm.setFieldsValue({ roleIds: record.roleCodes ? res.filter(r => record.roleCodes.includes(r.code)).map(r => r.id) : [] });
    setRoleModalOpen(true);
  };

  const handleRoleSubmit = async () => {
    const values = await roleForm.validateFields();
    if (roleUser) {
      await assignRoles(roleUser.id, { roleIds: values.roleIds });
      message.success('角色分配成功');
    }
    setRoleModalOpen(false);
    fetchData();
  };

  const columns: ColumnsType<UserVO> = [
    { title: 'ID', dataIndex: 'id', width: 100 },
    { title: '用户名', dataIndex: 'username' },
    { title: '昵称', dataIndex: 'nickname' },
    {
      title: '角色', dataIndex: 'roleNames',
      render: (names: string[]) => names?.map(n => <Tag key={n}>{n}</Tag>),
    },
    {
      title: '状态', dataIndex: 'status',
      render: (s: number) => <Tag color={s === 1 ? 'green' : 'red'}>{s === 1 ? '启用' : '禁用'}</Tag>,
    },
    {
      title: '操作', key: 'action',
      render: (_, record) => (
        <Space>
          <Button type="link" size="small" icon={<EditOutlined />} onClick={() => handleEdit(record)}>编辑</Button>
          <Button type="link" size="small" onClick={() => handleRoleOpen(record)}>角色</Button>
          <Popconfirm title="确定删除?" onConfirm={() => handleDelete(record.id)}>
            <Button type="link" size="small" danger icon={<DeleteOutlined />}>删除</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="glass-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, color: '#1e293b' }}>用户管理</h3>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>新增用户</Button>
      </div>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={data?.records || []}
        loading={loading}
        pagination={{
          current: page,
          pageSize: size,
          total: data?.total || 0,
          onChange: (p, s) => { setPage(p); setSize(s); },
        }}
      />

      <Modal title={editingUser ? '编辑用户' : '新增用户'} open={modalOpen} onOk={handleSubmit} onCancel={() => setModalOpen(false)}>
        <Form form={form} layout="vertical">
          {!editingUser && <>
            <Form.Item name="username" label="用户名" rules={[{ required: true }, { min: 2, max: 64 }]}>
              <Input />
            </Form.Item>
            <Form.Item name="password" label="密码" rules={[{ required: true }, { min: 6, max: 32 }]}>
              <Input.Password />
            </Form.Item>
          </>}
          <Form.Item name="nickname" label="昵称">
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="手机号">
            <Input />
          </Form.Item>
          <Form.Item name="email" label="邮箱">
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <Modal title="分配角色" open={roleModalOpen} onOk={handleRoleSubmit} onCancel={() => setRoleModalOpen(false)}>
        <Form form={roleForm} layout="vertical">
          <Form.Item name="roleIds" label="角色">
            <Select mode="multiple" options={roles.map(r => ({ label: r.name, value: r.id }))} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
