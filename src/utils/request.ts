// http/index.js
import axios from 'axios'
import {message} from "ant-design-vue";
//创建axios的一个实例
const instance = axios.create({
    baseURL: 'http://149.28.51.32:7001/', //接口统一域名
    timeout: 6000, //设置超时
    headers: {
        'Content-Type': 'application/json;charset=UTF-8;',
    }
})
// let loading;
//正在请求的数量
let requestCount = 0
//显示loading
// const showLoading = () => {
//     if (requestCount === 0 && !loading) {
//         loading = ElLoading.service({
//             text: "Loading  ",
//             background: 'rgba(0, 0, 0, 0.7)',
//             spinner: 'el-icon-loading',
//         })
//     }
//     requestCount++;
// }
//隐藏loading
const hideLoading = () => {
    requestCount--
    if (requestCount == 0) {
        // loading.close()
    }
}

//请求拦截器
instance.interceptors.request.use((config) => {
    // showLoading()
    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
    const token = window.localStorage.getItem('token');
    token && (config.headers.Authorization = token)
    //若请求方式为post，则将data参数转为JSON字符串
    if (config.method === 'POST') {
        config.data = JSON.stringify(config.data);
    }
    return config;
}, (error) =>
    // 对请求错误做些什么
    Promise.reject(error));

//响应拦截器
instance.interceptors.response.use((response) => {
    hideLoading()
    //响应成功
    console.log('拦截器报错');
    return response.data;
}, (error) => {
    console.log(error)
    //响应错误
    if(error.response&&error.response.status){
        const status = error.response.status
        switch (status) {
            case 400:
                message.error('请求错误')
                break;
            case 401:
                message.error('请求错误')
                break;
            case 404:
                message.error('请求地址出错')
                break;
            case 408:
                message.error('请求超时')
                break;
            case 500:
                message.error('服务器内部错误')
                break;
            case 501:
                message.error('服务未实现')
                break;
            case 502:
                message.error('网关错误')
                break;
            case 503:
                message.error('服务不可用')
                break;
            case 504:
                message.error('网关超时')
                break;
            case 505:
                message.error('HTTP版本不受支持')
                break;
            default:
                message.error('请求失败')
        }
        return Promise.reject(error);
    }
    return Promise.reject(error);
});


export default instance;
