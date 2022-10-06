// 文件名即 namespace，model 内如果没有声明 namespace，会以文件名作为 namespace
export default {
  state: {
    count: 0,
  },
  reducers: {
    increment(state, action) {
      return { ...state, count: state.count + action.payload };
    },
    // 配置文件里面配置了 immer: true，就可以通过 state.点的方式直接修改状态
    decrement(state, action) {
      state.count += action.payload;
    },
  },
  effects: {
    *incrementAsync(action, { call, put }) {
      let delay = (ms) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(1);
          }, ms);
        });
      };
      let res = yield call(delay, 2000);
      yield put({
        type: 'increment',
        payload: res + action.payload,
      });
    },
  },
};
