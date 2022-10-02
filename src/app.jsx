// 运行时配置文件 src -> app.jsx
import { message } from 'antd';
import './utils/init-leancloud-sdk';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '请求方法不被允许。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
// 全局请求拦截
const requestInterceptor = (url, options) => {
  let baseUrl = '';
  if (url.includes('stu')) {
    baseUrl = url;
  } else {
    baseUrl = 'https://qvcbe8gf.lc-cn-n1-shared.com/1.1' + url;
  }
  return {
    // 此处可以添加域名前缀，LeanCloud云服务器里面的 REST API 服务器地址
    // LeanCloud云服务器 REST API 风格如何使用？
    // 请求地址：https://qvcbe8gf.lc-cn-n1-shared.com/1.1/classes/stu
    // 解释：https://qvcbe8gf.lc-cn-n1-shared.com/1.1基地址，/classes必须要的，stu是LeanCloud云服务器创建的数据库名
    // 增删改查分别使用 POST请求、DELETE请求、PUT请求、GET请求 (具体看文档介绍)
    url: baseUrl,
    options: {
      ...options,
      // LeanCloud云服务器里面的AppID 和 AppKey
      headers: {
        'X-LC-Id': 'qvCBe8gfLQfNgY6gdvaKKp7x-gzGzoHsz',
        'X-LC-Key': 'CWDNhkVrBbtDdmj2hY10op5z',
        'Content-Type': 'application/json',
      },
    },
  };
};
// 全局相应拦截
const responseInterceptor = (response, options) => {
  return response;
};
// 异常处理
const errorHandler = (error) => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    message.error(`请求错误 ${status}: ${url}`);
  }

  if (!response) {
    message.error('您的网络发生异常，无法连接服务器');
  }
  throw error;
};
// 拦截器的导出一个request对象
// 会对 import { request } from 'umi'，对request请求函数发送的请求进行拦截
export const request = {
  timeout: 1000,
  errorConfig: {},
  middlewares: [],
  errorHandler,
  requestInterceptors: [requestInterceptor],
  responseInterceptors: [responseInterceptor],
};
