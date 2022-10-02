import React, { useEffect, useRef, useImperativeHandle, useState } from 'react';
import { Form, Input, message } from 'antd';
import ImgUpload from '../../../component/imgUpload';

function BannerForm(props, ref) {
  const [pic, setPic] = useState('');
  const formRef = useRef();

  useEffect(() => {
    if (props.record) {
      let { title, url, pic } = props.record;
      setPic(pic);
      formRef.current.setFieldsValue({
        title,
        url,
      });
    }
  }, [props.record]);

  useImperativeHandle(ref, () => {
    return {
      operate,
      reset,
    };
  });

  const operate = () => {
    formRef.current.validateFields().then((value) => {
      if (pic) {
        props.ok({ ...value, pic });
      } else {
        message.error('请选择图片');
      }
    });
  };

  const reset = () => {
    formRef.current.resetFields();
    setPic('');
  };

  return (
    <div>
      <Form
        ref={formRef}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
      >
        <Form.Item
          name="title"
          label="活动名称"
          rules={[{ required: true, message: '请输入活动名称!' }]}
        >
          <Input placeholder="请输入活动名称" />
        </Form.Item>
        <Form.Item
          name="url"
          label="活动链接"
          rules={[{ required: true, message: '请输入活动链接!' }]}
        >
          <Input placeholder="请输入活动链接" />
        </Form.Item>
        <Form.Item name="pic" label="封面图片">
          <ImgUpload imageUrl={pic} setImageUrl={setPic} />
        </Form.Item>
      </Form>
    </div>
  );
}

export default React.forwardRef(BannerForm);
