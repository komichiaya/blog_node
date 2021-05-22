/**
 * 二次封装axios
 */
import axios from "axios";
import qs from "qs";
import { ElLoading } from "element-plus"
import router from "@/router";

const instance = axios.create({
  // baseURL : "http://localhost:1188",  //出现跨域
  baseURL: "/api", //让代理服务器转发请求4000
  timeout: 20000, //配置请求超时的时间
});

//添加请求拦截器：即将要发送请求时，将请求拦截，对当前请求进行批量处理
instance.interceptors.request.use((config) => {
  ElLoading.service({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)',
    fullscreen: true
  });

  // 1.config包含当前请求的所有请求信息: method url data
  // 2.对请求体参数进行urlencode处理，而不适用默认的json方式（后台接口不支持
  // const data = config.data;
  // if (data instanceof Object) {
  //   config.data = qs.stringify(data);
  // }


  let token = localStorage.getItem("user_token");
  if (config.headers.firstLogin) {
    if (token) {
      config.headers.authorization = token;
      config.headers.firstLogin = false;
    }
  } 
  return config;
});

//设置响应拦截器
instance.interceptors.response.use(

  (response) => {
    setTimeout(() => {
      ElLoading.service().close();
    }, 0)
    return response.data;
  },
  (error) => {
    // 以服务的方式调用的 Loading 需要异步关闭
    setTimeout(() => {
      ElLoading.service().close();
    }, 0)
    if (!error.response) {
      console.log('error.response', error.response)
      //请求没有真正发出去，在请求拦截器报的错
      alert(error.message);
      //跳转至登录页
      if (router.currentRoute.path !== "/login") {
        // location.href = "http://localhost:8080/login";
        router.replace("/login");
      }
    } else {
      //发送请求后获取错误信息对象
      if (error.response.status === 401) {
        alert("token过期，重新登录");
      } else if (error.response.status === 404) {
        alert("请求资源未找到");
      } else {
        alert("请求错误");
      }
    }
    return new Promise(() => { });
  }
);
export default instance;
