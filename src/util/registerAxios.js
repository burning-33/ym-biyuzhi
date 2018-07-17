/*
 * @Author:      cyzeng
 * @DateTime:    2017-07-31 15:51:50
 * @Description: 统一请求或返回API层
 */

import Vue from 'vue'
import qs from 'qs'
import axios from 'axios'
import { mapState } from 'vuex';
import {
  urls,
  noTokenReq
} from '@Util/axiosConfig'
// 验证权限
function validatePower(url){
  // 验证访问页面是否需要权限
  if (noTokenReq.indexOf(url) == -1) {
    // 验证浏览器sessionstorage缓存中是否存在token
    let agentToken = sessionStorage.getItem("agentToken");
    axios.defaults.headers.common['agentToken'] = agentToken;
    return agentToken ? true : false;
  }else{
    return true;
  }
}


// 统一处理成功请求返回值
function resolveSuccessRes(res){
  // debugger

  if(res.data.code == 402){
    window.app.$store.commit('login/setUserInfo', {});    
    window.app.$message.error(res.data.msg);    
    window.app.$router.push({name:'report'});
    // this.$router.push({name: 'login'});
  }

  if(res.data.code == 403){

    window.app.$store.commit('login/setUserInfo', {});    
    window.app.$message.error('登录超时！');    
    window.app.$router.push({name:'report'});
  }

  if(res.status == 200){
    // 自定义增加序列号
    // let pagination = res.data.data.pagination;
    // for(let key in res.data.data){
    //   //判断是否拥有pagination，且判断是否为数组
    //   if(pagination &&
    //       Array.isArray(res.data.data[key])){
    //     res.data.data[key].map( (element,index) => {
    //       element.index = (pagination.limit) * (pagination.page-1) + (index+1);
    //     })
    //   }
    // }
    return res.data;
  }else{
    // 表示网络正常，服务器拒绝
    window.app.$message.error(res.data.msg);
    return res.data;
  }
}


// 统一处理失败请求返回值
function resolveFailRes(status){
  if(status >= 500){
    window.app.$message.error('服务器错误，请稍后重试');
  }else if(status >= 400 && status < 500){
    if(status == 404){
    window.app.$message.error('网络错误，请稍后重试');
    }else{
    window.app.$message.error('客户端错误，请联系工作人员');
    }
  }else if( status >= 300 && status < 400){
    window.app.$message.error('请求发生重定向，请联系工作人员');
  }
}


// post请求
let post = function(url, params, btn){
  let requestData = params ? params : {};
  
  // 验证权限
  // if(validatePower(url)){
    
    return axios.post(url, requestData)
                .then( (res) => {
                  return resolveSuccessRes(res);
                }).catch((error)=>{
                  
                  if(error.response.status){
                    resolveFailRes(error.response.status);
                  }
                })

  // }else{
  //   // 权限不足，跳转至登录页面
  //   this.$router.push({name: 'login'});
  // }
}

let qsPost = function(url, params, btn){
  let requestData = params ? qs.stringify(params) : {};
    return axios.post(url, requestData)
                .then( (res) => {
                  return resolveSuccessRes(res);
                }).catch((error)=>{
                  if(error.response.status){
                    resolveFailRes(error.response.status);
                  }
                })

}

// get请求
let get = function(url, params, btn){
  let requestData = params ? params : {};
  
  // 验证权限
  // if(validatePower(url)){
    return axios.get(url, {params: requestData})
                .then( (res) => {
                  return resolveSuccessRes(res);
                }).catch((error)=>{
                  if(error.response.status){
                    resolveFailRes(error.response.status);
                  }
                  // this.$message.error('网络错误，请稍后重试');
                })
  // }else{
  //   // 权限不足，跳转至登录页面
  //   this.$router.push({name: 'login'});
  // }
}


// 初始化axios
axios.defaults.baseURL = urls.BASE_URL;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
// axios.defaults.headers.post['Access-Control-Request-Method'] = 'Post';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
axios.defaults.timeout = 25000;


// ajax请求,挂在到Vue中
Vue.prototype.$ajaxPost = post;
Vue.prototype.$ajaxQsPost = qsPost;
Vue.prototype.$ajaxGet = get;

