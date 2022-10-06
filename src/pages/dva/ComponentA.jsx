import React from 'react';
import { connect } from 'umi';
import { Card, Space, Button } from 'antd';

function ComponentA(props) {
  const dispatch = props.dispatch;

  // 减
  const sub = () => {
    dispatch({
      type: 'count/decrement',
      payload: -1,
    });
  };

  // 加
  const add = () => {
    dispatch({
      type: 'count/increment',
      payload: 1,
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <Card type="inner" title="dva状态管理 - 组件A">
        <h2>count: {props.count}</h2>
        <Space>
          <Button size="large" onClick={sub}>
            {' '}
            -{' '}
          </Button>
          <Button type="primary" size="large" onClick={add}>
            {' '}
            +{' '}
          </Button>
        </Space>
      </Card>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    count: state.count.count,
  };
};

export default connect(mapStateToProps)(ComponentA);
