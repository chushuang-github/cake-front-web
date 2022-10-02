import request from 'umi-request'

// 获取
export const stuGet = () => {
  return request.get('/classes/stu')
}

// 删除
export const stuDelete = (id) => {
  return request.delete(`/classes/stu/${id}`)
}

// 更新
export const stuUpdate = (value, id) => {
  return request.patch('/classes/stu', {
    data: {
      value,
      id
    }
  })
}

// 增加
export const stuAdd = (value) => {
  return request.post('/classes/stu', {
    data: {
      value
    }
  })
}
