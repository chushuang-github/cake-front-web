import React from 'react';
import { history, useModel } from 'umi';
import { Button, Form, Input, Card, Row, Col, Spin, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useRequest } from 'umi';
import { userLogin } from '../../api/user';

const Login = () => {
  // 使用useModel，可以获取 @umijs/plugin-initial-state 插件设置的数据
  const { initialState, setInitialState } = useModel('@@initialState');
  const { loading, run } = useRequest(userLogin, { manual: true });

  // 登录调用的函数
  const onFinish = async (values) => {
    // run方法，调用上面的请求函数
    const userInfo = await run(values);
    message.success('登录成功');
    let info = {
      isLogin: true,
      userInfo,
    };
    // 本地存储
    localStorage.setItem('info', JSON.stringify(info));
    // 设置完 InitialState 之后，需要延迟一下在进行页面跳转
    setInitialState(info);
    setTimeout(() => {
      history.replace('/');
    }, 0);
  };

  return (
    <Row style={{ height: '100vh', background: '#75baec' }}>
      <Col span={8} offset={8}>
        <Spin spinning={loading}>
          <Card title="请登录" style={{ marginTop: '150px' }}>
            <Form
              name="normal_login"
              className="login-form"
              onFinish={onFinish}
            >
              <Form.Item
                name="username"
                rules={[{ required: true, message: '请输入用户名!' }]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="请输入用户名"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: '请输入密码!' }]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="请输入密码"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  size="large"
                  block
                >
                  登录
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Spin>
      </Col>
    </Row>
  );
};

export default Login;
