import React, { useRef, useState } from 'react';
import { Table, Button, Space, Modal, Image, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useRequest } from 'umi';
import { shopGet, shopDelete } from '../../api/shop';
import { categoryGet } from '../../api/category';

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
      title: '分类ID',
      dataIndex: 'categoryId',
      key: 'categoryId',
      align: 'center',
    },
    {
      title: '分类名称',
      dataIndex: 'categoryName',
      key: 'categoryName',
      align: 'center',
      render: (text, record) => {
        let categoryName = categoryList?.results.find(
          (item) => item.objectId === record.categoryId,
        ).categoryName;
        return categoryName;
      },
    },
    {
      title: '操作',
      key: 'operate',
      align: 'center',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => showModal(record)}>
            查看详情
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
    return shopGet();
  });
  const { data: categoryList } = useRequest(categoryGet);

  // 删除
  const deleteList = (record) => {
    Modal.confirm({
      title: '删除',
      content: '您确定删除该条数据吗?',
      icon: <ExclamationCircleOutlined />,
      onOk: async () => {
        await shopDelete(record.objectId);
        // 调用run方法，再次发送获取列表的请求
        // run(参数)：run方法调用的时候，可以传递参数，参数会被传入useRequest的一个参数回调函数里面
        run();
        message.success('删除成功');
      },
      onCancel() {},
    });
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
        title="查看详情"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div dangerouslySetInnerHTML={{ __html: record.detail }}></div>
      </Modal>
    </div>
  );
}
