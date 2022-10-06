import React from 'react';
import { useDispatch, useSelector } from 'umi';
import { Card, Space, Button } from 'antd';

export default function ComponentB() {
  const dispatch = useDispatch();
  const { count, loading } = useSelector((state) => ({
    count: state.count.count,
    loading: state.loading.global,
  }));

  // 减
  const sub = () => {
    dispatch({
      type: 'count/decrement',
      payload: -1,
    });
  };

  // 异步加
  const add = () => {
    dispatch({
      type: 'count/incrementAsync',
      payload: 1,
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <Card type="inner" title="dva状态管理 - 组件B">
        <h2>count: {count}</h2>
        <Space>
          <Button size="large" onClick={sub}>
            {' '}
            -{' '}
          </Button>
          <Button type="primary" size="large" onClick={add} loading={loading}>
            {' '}
            延迟2秒加{' '}
          </Button>
        </Space>
      </Card>
    </div>
  );
}
