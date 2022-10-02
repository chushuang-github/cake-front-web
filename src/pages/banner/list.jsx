import React, { useRef, useState } from 'react';
import { Table, Button, Space, Modal, Image, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useRequest } from 'umi';
import BannerForm from './component/form';
import { bannerGet, bannerDelete, bannerPut } from '../../api/banner';

export default function BannerList() {
  const [record, setRecord] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formRef = useRef();

  const columns = [
    {
      title: 'ID',
      dataIndex: 'objectId',
      key: 'objectId',
      align: 'center',
      width: 260,
    },
    {
      title: '活动名称',
      dataIndex: 'title',
      key: 'title',
      align: 'center',
    },
    {
      title: '轮播图片',
      dataIndex: 'pic',
      key: 'pic',
      align: 'center',
      render: (pic, record) => {
        return <Image width={120} src={pic} />;
      },
    },
    {
      title: '活动链接',
      dataIndex: 'url',
      key: 'url',
      align: 'center',
    },
    {
      title: '操作',
      key: 'operate',
      align: 'center',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => showModal(record)}>
            编辑
          </Button>
          <Button type="primary" danger onClick={() => deleteList(record)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  // 发送网络请求
  const { data, loading, run } = useRequest(() => {
    return bannerGet();
  });

  // 删除
  const deleteList = (record) => {
    Modal.confirm({
      title: '删除',
      content: '您确定删除该条数据吗?',
      icon: <ExclamationCircleOutlined />,
      onOk: async () => {
        await bannerDelete(record.objectId);
        // 调用run方法，再次发送获取列表的请求
        // run(参数)：run方法调用的时候，可以传递参数，参数会被传入useRequest的一个参数回调函数里面
        run();
        message.success('删除成功');
      },
      onCancel() {},
    });
  };

  // 更新
  const ok = async (value) => {
    delete value.objectId;
    await bannerPut(value, record.objectId);
    run();
    message.success('更新成功');
    setIsModalOpen(false);
  };

  // 编辑弹窗的操作
  const showModal = (record) => {
    setRecord(record);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    formRef.current.operate();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{ padding: '20px 20px 0px' }}>
      <Table
        loading={loading}
        dataSource={data?.results}
        columns={columns}
        rowKey="objectId"
      />
      <Modal
        title="编辑"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <BannerForm record={record} ref={formRef} ok={ok} />
      </Modal>
    </div>
  );
}
