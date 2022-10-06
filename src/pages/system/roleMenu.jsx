import React, { useRef } from 'react';
import { Button, Space, message, Form, Input } from 'antd';
import { roleAdd } from '../../api/user';

export default function RoleMenu() {
  const formRef = useRef();

  // 重置
  const reset = () => {
    formRef.current.resetFields();
  };

  const handleOk = () => {
    formRef.current.validateFields().then(async (value) => {
      const res = await roleAdd(value);
      message.success('新增角色成功');
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
          name="roleName"
          label="角色名称"
          rules={[{ required: true, message: '请输入你的角色名称!' }]}
        >
          <Input placeholder="请输入角色名称" />
        </Form.Item>
        <Form.Item
          name="roleCode"
          label="角色代号"
          rules={[{ required: true, message: '请输入你的角色代号!' }]}
        >
          <Input placeholder="请输入角色代号" />
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
