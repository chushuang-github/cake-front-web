import React, { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import Cloud from 'leancloud-storage';

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('请选择 jpg 或者 png 格式图片!');
  }

  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('图片大小不能超过 2MB!');
  }

  return isJpgOrPng && isLt2M;
};

const ImgUpload = (props) => {
  const [loading, setLoading] = useState(false);

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  // 自定义上传
  const customUpload = (info) => {
    getBase64(info.file, (base64) => {
      // base64图片是以：'data:image/jpeg;base64,' 开头的字符串
      // 下面的代码是在LeanCloud服务器 数据存储开发指南 · JavaScript 找到的，进行LeanCloud文件上传操作
      // 下面的代码作用：将本地的文件资源(图片)，构建为一个可以上传到LeanCloud云服务器的资源对象
      // 第一个参数是文件名
      const file = new Cloud.File(info.file.name, { base64 });
      // 上传文件
      file.save().then((res) => {
        setLoading(false);
        props.setImageUrl(res.attributes.url);
      });
    });
  };

  return (
    <Upload
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      beforeUpload={beforeUpload}
      customRequest={customUpload} //	通过覆盖默认的上传行为，可以自定义自己的上传实现
    >
      {props.imageUrl ? (
        <img src={props.imageUrl} alt="avatar" style={{ width: '100%' }} />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};

export default ImgUpload;
