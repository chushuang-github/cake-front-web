import { request } from 'umi';

// 录入配送范围
export const areaAdd = (value) => {
  return request('/classes/area', {
    method: 'post',
    data: value,
  });
};

export const areaQuery = (value) => {
  return request('/classes/area');
};
