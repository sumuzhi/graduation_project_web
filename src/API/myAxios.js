import axios from 'axios'
// import {createDeleteUserInfoAction} from "../redux/action_creators/login_action";

//自定义axios实列添加拦截器
const instance = axios.create({
  // timeout: 4000
});

// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {

    // const { token } = store.getState().userInfo
    // if (token) config.headers.Authorization = 'sumuzhi_' + token

    // 在发送请求之前做些什么
    /**
     * 在发送请求的时候,axios默认的发送编码为json格式
     * 服务器接收到的编码格式为urlencoding
     * 在此可以利用axios的拦截器将参数进行格式的转化
     * */
    // if (config.method.toLowerCase() === 'post') {
    //   if (config.data instanceof Object) {
    //     // config.data = qs.stringify(config.data)
    //   }
    // }
    // console.log(config)
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    return response.data;
  },
  (error) => {
 /*    if (error.response.status === 401) {  //当token过期后进行重新登录操作
      // store.dispatch(createDeleteUserInfoAction())
      Toast.error("身份过期,请重新登录", 1)
    } else {
      Toast.error(error.message)
    } */
    // 对响应错误做点什么
    return Promise.reject(error);
  });

export default instance
