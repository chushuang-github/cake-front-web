import { request } from 'umi';

// 登录
export const userLogin = (user) => {
  return request('/login', {
    method: 'post',
    data: user,
  });
};
