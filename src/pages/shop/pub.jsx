import React, { useRef } from 'react';
import { Button, Space, message } from 'antd';
import ShopForm from './component/form';
import { shopPost } from '../../api/shop';

export default function BannerPub() {
  const formRef = useRef();
  // 添加
  const ok = async (value) => {
    let res = await shopPost(value);
    message.success('添加成功');
    formRef.current.reset();
  };

  // 重置
  const reset = () => {
    formRef.current.reset();
  };

  const handleOk = () => {
    formRef.current.operate();
  };

  return (
    <div style={{ padding: '20px 0px' }}>
      <ShopForm ref={formRef} ok={ok} />
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
