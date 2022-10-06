import React, { useRef } from 'react';
import { Button, Space, message, Form, Input, Select } from 'antd';
import { useRequest } from 'umi';
import { userRegistry, roleQuery } from '../../api/user';

const { Option } = Select;

export default function UserMenu() {
  const formRef = useRef();
  const { data } = useRequest(roleQuery);

  // 重置
  const reset = () => {
    formRef.current.resetFields();
  };

  const handleOk = () => {
    formRef.current.validateFields().then(async (value) => {
      const res = await userRegistry(value);
      message.success('新增用户成功');
      reset();
    });
  };

  return (
    <div style={{ padding: '20px 0px' }}>
      <Form
        ref={formRef}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
      >
        <Form.Item
          name="username"
          label="账号"
          rules={[{ required: true, message: '请输入你的账号!' }]}
        >
          <Input placeholder="请输入角色名称" />
        </Form.Item>
        <Form.Item
          name="password"
          label="密码"
          rules={[{ required: true, message: '请输入你的密码!' }]}
        >
          <Input placeholder="请输入密码" />
        </Form.Item>
        <Form.Item
          name="role"
          label="角色"
          rules={[{ required: true, message: '请选择角色名称!' }]}
        >
          <Select placeholder="请选择角色名称">
            {data?.results.map((item) => (
              <Option value={item.roleCode} key={item.objectId}>
                {item.roleName}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
      <div style={{ textAlign: 'center' }}>
        <Space>
          <Button type="primary" size="large" onClick={handleOk}>
            添加
          </Button>
          <Button size="large" onClick={reset}>
            重置
          </Button>
        </Space>
      </div>
    </div>
  );
}
