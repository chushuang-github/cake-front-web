// LeanCloud云服务器 REST API 风格的接口调用方式
import { request } from 'umi'

// 获取
export const categoryGet = () => {
  // 默认是get请求
  return request('/classes/category')
}

// 删除
export const categoryDelete = (id) => {
  return request(`/classes/category/${id}`, {
    method: 'delete'
  })
}

// 更新
export const categoryPut = (value, id) => {
  return request(`/classes/category/${id}`, {
    method: 'put',
    data: value
  })
}

// 增加
export const categoryPost = (value) => {
  return request('/classes/category', {
    method: 'post',
    data: value
  })
}
