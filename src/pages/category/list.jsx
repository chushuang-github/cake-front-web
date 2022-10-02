import React, { useRef, useState } from 'react'
import { Table, Button, Space, Modal, message } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { useRequest } from 'umi'
import CategoryForm from './component/form'
import { categoryGet, categoryDelete, categoryPut } from '../../api/category'

export default function StuList() {
  const [record, setRecord] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const formRef = useRef()

  const columns = [
    {
      title: 'ID',
      dataIndex: 'objectId',
      key: 'objectId',
      align: 'center'
    },
    {
      title: '分类名称',
      dataIndex: 'categoryName',
      key: 'categoryName',
      align: 'center'
    },
    {
      title: '操作',
      key: 'operate',
      align: 'center',
      render: (text, record) => (
        <Space size='middle'>
          <Button type='primary' onClick={() => showModal(record)}>编辑</Button>
          <Button type='primary' danger onClick={() => deleteList(record)}>删除</Button>
        </Space>
      )
    }
  ]

  // 发送网络请求
  const { data, loading, run } = useRequest(() => {
    return categoryGet()
  })

  // 删除
  const deleteList = (record) => {
    Modal.confirm({
      title: '删除',
      content: '您确定删除该条数据吗?',
      icon: <ExclamationCircleOutlined />,
      onOk: async () => {
        await categoryDelete(record.objectId)
        // 调用run方法，再次发送获取列表的请求
        run()
        message.success('删除成功')
      },
      onCancel() {},
    });
  }

  // 更新
  const ok = async (value) => {
    delete value.objectId
    console.log(value)
    await categoryPut(value, record.objectId)
    run()
    message.success('更新成功')
    setIsModalOpen(false)
  }

  // 编辑弹窗的操作
  const showModal = (record) => {
    setRecord(record)
    setIsModalOpen(true)
  }
  const handleOk = () => {
    formRef.current.operate()
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <div style={{ padding: '20px 20px 0px' }}>
      <Table loading={loading} dataSource={data?.results} columns={columns} rowKey='objectId' />
      <Modal title="编辑" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <CategoryForm record={record} ref={formRef} ok={ok} />
      </Modal>
    </div>
  )
}
