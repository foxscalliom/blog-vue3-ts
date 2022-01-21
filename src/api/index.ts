import service from '@/utils/request'
export function getData(){
    return service({
        //请求地址..
        url:'/default/getArticleList',
        //请求方式..
        method:"get",
        //post请求时使用..
        // data:{
        //     name:''
        // },
        // //get请求时使用..
        // params:{
        //     id:''
        // }
    })
}
