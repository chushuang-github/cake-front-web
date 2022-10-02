import React, { useEffect, useRef, useImperativeHandle } from 'react'
import { Form, Input } from 'antd'

function CategoryForm(props, ref) {
  const formRef = useRef()

  useEffect(() => {
    if(props.record) {
      let { objectId, categoryName } = props.record
      formRef.current.setFieldsValue({
        objectId,
        categoryName
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
          name="objectId"
          label="分类ID"
          style={{ display: props.type === 'add' ? 'none': '' }}
        >
          <Input disabled={true} />
        </Form.Item>
        <Form.Item
          name="categoryName"
          label="分类名称"
          rules={[
            { required: true, message: '请输入你的分类名称!' }
          ]}
        >
          <Input placeholder='请输入分类名称' />
        </Form.Item>
      </Form>
    </div>
  )
}

export default React.forwardRef(CategoryForm)
