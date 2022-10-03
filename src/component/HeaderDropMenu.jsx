import React from 'react';
import { useModel, history } from 'umi';
import { Dropdown, Menu, Space } from 'antd';
import { DownOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';

export default function HeaderDropMenu() {
  const { initialState, setInitialState } = useModel('@@initialState');
  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        { label: '个人设置', key: '1', icon: <UserOutlined /> },
        { label: '退出登录', key: '2', icon: <LogoutOutlined /> },
      ]}
    />
  );

  // 退出登录
  function handleMenuClick({ key }) {
    if (key === '2') {
      setInitialState({
        isLogin: false,
        userInfo: null,
      });
      localStorage.removeItem('info');
      history.push('/login');
    }
  }

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          {initialState.userInfo?.username}
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
}
