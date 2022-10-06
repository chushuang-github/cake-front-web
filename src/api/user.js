import { request } from 'umi';

// 登录
export const userLogin = (user) => {
  return request('/login', {
    method: 'post',
    data: user,
  });
};

// 注册
export const userRegistry = (user) => {
  return request('/users', {
    method: 'post',
    data: user,
  });
};

// 新增角色
export const roleAdd = (user) => {
  return request('/classes/cakeRole', {
    method: 'post',
    data: user,
  });
};

// 查询角色
export const roleQuery = () => {
  return request('/classes/cakeRole');
};
