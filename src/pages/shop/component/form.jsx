import React, { useEffect, useRef, useImperativeHandle, useState } from 'react';
import { Form, Input, Select, message } from 'antd';
import RichEditor from '../../../component/RichEditor';
import { useRequest } from 'umi';
import { categoryGet } from '../../../api/category';

const { Option } = Select;

function ShopForm(props, ref) {
  const [detail, setDetail] = useState('');
  const formRef = useRef();

  const { data } = useRequest(categoryGet);

  useEffect(() => {
    if (props.record) {
      let { categoryId, detail } = props.record;
      formRef.current.setFieldsValue({
        categoryId,
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
      props.ok(value);
    });
  };

  const reset = () => {
    setDetail('');
    formRef.current.resetFields();
  };

  // 富文本编辑器发生变化
  const onChange = (html) => {
    setDetail(html);
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
          name="categoryId"
          label="分类选择"
          rules={[{ required: true, message: '请选择分类名称!' }]}
        >
          <Select placeholder="请输入活动名称">
            {data?.results.map((item) => (
              <Option value={item.objectId} key={item.objectId}>
                {item.categoryName}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="detail"
          label="商品详情"
          rules={[{ required: true, message: '请输入商品详情!' }]}
        >
          <RichEditor onChange={onChange} />
        </Form.Item>
      </Form>
    </div>
  );
}

export default React.forwardRef(ShopForm);
