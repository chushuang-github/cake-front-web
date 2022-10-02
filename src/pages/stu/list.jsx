import React, { useState, useEffect, useRef } from 'react'
import { Table, Button, Space, Modal, message } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import StuForm from './component/form'
import { stuGet, stuDelete, stuUpdate } from '../../api/stu'

export default function StuList() {
  const [data, setData] = useState([])
  const [record, setRecord] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const formRef = useRef()

  useEffect(() => {
    getList()
  }, [])

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      align: 'center'
    },
    {
      title: '分数',
      dataIndex: 'score',
      key: 'score',
      align: 'center'
    },
    {
      title: '城市',
      dataIndex: 'city',
      key: 'city',
      align: 'center'
    },
    {
      title: '生日',
      dataIndex: 'time',
      key: 'time',
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

  // 获取列表数据
  const getList = async () => {
    setLoading(true)
    const res = await stuGet()
    setLoading(false)
    setData(res.data)
  }

  // 删除
  const deleteList = (record) => {
    Modal.confirm({
      title: '删除',
      content: '您确定删除该条数据吗?',
      icon: <ExclamationCircleOutlined />,
      onOk: async () => {
        const res = await stuDelete(record.objectId)
        if(res.code === 200) {
          getList()
          message.success(res.message)
        }
      },
      onCancel() {},
    });
  }

  // 更新
  const ok = async (value) => {
    let res = await stuUpdate(value, record.objectId)
    if(res.code === 200) {
      getList()
      message.success(res.message)
      setIsModalOpen(false)
    }
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
      <Table loading={loading} dataSource={data} columns={columns} rowKey='objectId' />
      <Modal title="编辑" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <StuForm record={record} ref={formRef} ok={ok} />
      </Modal>
    </div>
  )
}
