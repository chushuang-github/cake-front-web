import { request } from 'umi';

// 获取
export const shopGet = () => {
  // 默认是get请求
  return request('/classes/shop');
};

// 删除
export const shopDelete = (id) => {
  return request(`/classes/shop/${id}`, {
    method: 'delete',
  });
};

// 增加
export const shopPost = (value) => {
  return request('/classes/shop', {
    method: 'post',
    data: value,
  });
};
