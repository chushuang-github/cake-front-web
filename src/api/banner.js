import { request } from 'umi';

// 获取
export const bannerGet = () => {
  // 默认是get请求
  return request('/classes/banner');
};

// 删除
export const bannerDelete = (id) => {
  return request(`/classes/banner/${id}`, {
    method: 'delete',
  });
};

// 更新
export const bannerPut = (value, id) => {
  return request(`/classes/banner/${id}`, {
    method: 'put',
    data: value,
  });
};

// 增加
export const bannerPost = (value) => {
  return request('/classes/banner', {
    method: 'post',
    data: value,
  });
};
