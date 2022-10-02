import React, { useEffect, useRef, useImperativeHandle } from 'react'
import { Form, Input, DatePicker } from 'antd'
import moment from 'moment'

function StuForm(props, ref) {
  const formRef = useRef()

  useEffect(() => {
    if(props.record) {
      let { name, score, city, time } = props.record
      formRef.current.setFieldsValue({
        name,
        score,
        city,
        time: moment(time)
      })
    }
  }, [props.record])

  useImperativeHandle(ref, () => {
    return {
      operate,
      reset
    }
  })

  const operate = () => {
    formRef.current.validateFields().then(value => {
      value.time = value.time.format('YYYY-MM-DD')
      props.ok(value)
    })
  }

  const reset = () => {
    formRef.current.resetFields()
  }

  return (
    <div>
      <Form
        ref={formRef}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
      >
        <Form.Item
          name="name"
          label="姓名"
          rules={[
            { required: true, message: '请输入你的姓名!' }
          ]}
        >
          <Input placeholder='请输入姓名' />
        </Form.Item>
        <Form.Item
          name="score"
          label="分数"
          rules={[
            { required: true, message: '请输入你的分数!' },
            { pattern: /^\d+$/, message: '分数必须为数字' }
          ]}
        >
          <Input placeholder='请输入分数' />
        </Form.Item>
        <Form.Item
          name="city"
          label="城市"
          rules={[
            { required: true, message: '请输入你的城市!' }
          ]}
        >
          <Input placeholder='请输入城市' />
        </Form.Item>
        <Form.Item
          name="time"
          label="生日"
          rules={[
            { required: true, message: '请选择你的生日!' }
          ]}
        >
          <DatePicker
            placeholder='请选择生日'
            style={{ width: '100%' }}
            format="YYYY-MM-DD"
          />
        </Form.Item>
      </Form>
    </div>
  )
}

export default React.forwardRef(StuForm)
