import Mock from 'mockjs'

// 数据
let data = []
for(let i = 0; i < 100; i++) {
  data.push(Mock.mock({
    objectId: '@id',
    name: '@cname',
    score: '@integer(50, 100)',
    city: '@city',
    time: '@date'
  }))
}

export default {
  'GET /classes/stu': {
    code: 200,
    message: '学员列表加载成功',
    data
  },
  'DELETE /classes/stu/:id': (req, res) => {
    let { id } = req.params
    // umijs里面mock数据是有缓存的
    // 修改data数据，不能重新给data赋值，必须要data数据引用地址值不变，修改里面的属性才能保证缓存有效
    for(let i = 0; i < data.length; i++) {
      if(data[i].objectId === id) {
        data.splice(i, 1)
        break
      }
    }
    res.send({
      code: 200,
      message: '学员列表删除成功',
    })
  },
  'PATCH /classes/stu': (req, res) => {
    let { value, id } = req.body
    for(let i = 0; i < data.length; i++) {
      if(data[i].objectId === id) {
        Object.keys(value).forEach(key => {
          data[i][key] = value[key]
        })
        break
      }
    }
    res.send({
      code: 200,
      message: '学员列表更新成功',
    })
  },
  'POST /classes/stu': (req, res) => {
    let { value } = req.body
    data.unshift({
      objectId: Mock.mock('@id'),
      ...value
    })
    res.send({
      code: 200,
      message: '学员列表增加成功',
    })
  }
}
