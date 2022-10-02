// 富文本编辑器
import React, { useEffect, useRef } from 'react';
import Editor from 'wangeditor';
import Cloud from 'leancloud-storage';

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

export default function RichEditor(props) {
  const editorRef = useRef();
  useEffect(() => {
    // 初始化富文本编辑器实例
    const editor = new Editor(editorRef.current);
    editor.config.zIndex = 500;
    // 配置 onchange 回调函数
    editor.config.onchange = function (newHtml) {
      props.onChange(newHtml);
    };
    // 富文本编辑器自定义图片上传
    editor.config.customUploadImg = function (resultFiles, insertImgFn) {
      // resultFiles 是 input 中选中的文件列表
      // insertImgFn 是获取图片 url 后，插入到编辑器的方法
      getBase64(resultFiles[0], (base64) => {
        // base64图片是以：'data:image/jpeg;base64,' 开头的字符串
        // 下面的代码是在LeanCloud服务器 数据存储开发指南 · JavaScript 找到的，进行LeanCloud文件上传操作
        // 下面的代码作用：将本地的文件资源(图片)，构建为一个可以上传到LeanCloud云服务器的资源对象
        // 第一个参数是文件名
        const file = new Cloud.File(resultFiles[0].name, { base64 });
        // 上传文件
        file.save().then((res) => {
          insertImgFn(res.attributes.url);
        });
      });
    };
    // 向指定dom元素里面渲染富文本编辑器
    editor.create();
  }, []);

  return <div ref={editorRef}></div>;
}
