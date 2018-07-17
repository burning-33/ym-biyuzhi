<!--
 * @Author:      cyzeng
 * @DateTime:    2017-07-24 13:53:30
 * @Description: topbar以及内容区域
 -->

<template>

<div class="clearfix">
    <div class="ctit">
        <em>基本信息</em>
    </div>
    <div class="quota clear">
     
        <p><span>手机号码：</span>
            {{userInfo.mobile}}
            <span v-if="userInfo.is_vip == '0'" style="margin-left:20px;color: orange">您还不是会员</span>
            
        </p>
        <p class="wechat">微信绑定: <span>{{!success?'未授权':'已授权'}}</span> <a v-if="!success" class="bind" @click="wechat">去绑定</a></p>
        <p><span>到期时间：</span>
            {{comUtil.formatTime(userInfo.expired_time)}}
        </p>
        <div class="rules" v-html='userInfo.rule'></div>
    </div>
</div>

</template>

<script>
  import {
          urls,
          baseUrl} from '@Util/axiosConfig';
  //加载相关依赖
  import { mapState } from 'vuex';
  import LoginVue from '@Components/LoginVue';
import comUtil from '@Util/comUtil';
  export default {
    props: ['navData'],
    data() {
      return {
          comUtil: comUtil,
          success:false,
          userInfo: {},
      }
    },
    mounted(){
        
        let url = window.location.href; 
         var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.split('?')[1];
            var strs = str.split("&");  
            for(var i = 0; i < strs.length; i ++) {
                theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
            }  
            this.user.token = theRequest.token;
            this.user.username = localStorage.getItem("username");
            this.user.is_vip = localStorage.getItem("is_vip");
            this.user.mobile = localStorage.getItem("mobile");
            this.user.openid = localStorage.getItem("openid");
            this.user.uid = localStorage.getItem("uid");
            this.$store.commit('login/setUserInfo', this.user);
            // console.log(this.user)
        }
        if(this.$route.params){
            this.success = this.$route.params.success;
        }
        this.getInfo();
    },
    computed: mapState({
      // 名字
      user: state => state.login.userInfo,


    }),
    methods: {
        // 邀请
        
        getInfo(){
            let _this = this;
            let params = {
                token: this.user.token
            };
            this.$ajaxGet(urls.MEMBER, params)
                .then((res)=>{
                  if( res && res.code == 200){
                        this.userInfo = res.data;
                        if(this.userInfo.is_bind){
                            _this.success = true;
                        }else{
                             _this.success = false;
                        }
                  }else{
                    this.$message.error(res.msg);
                  }
            })
        },
        // 微信授权
        wechat(){
            if(!this.success){
                // window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxfdbdfb1efb025f88&redirect_uri=http://yuzhi.link/personal/bind&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirec';
                 window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxfdbdfb1efb025f88&redirect_uri=http://adminbi.yuzhi.link/bind&response_type=code&scope=snsapi_userinfo&state='+this.user.token+'#wechat_redirec';
            }
        }

    },
    components: {
      
    }
  }

</script>


<style scoped>

/* // 大屏幕 */
@media only screen and (min-width: 1040px) {
    
}

/*移动端*/
@media only screen and (max-width: 1039px){

}
.ctit{
    border-bottom: 2px solid #ccc;
    height: 40px;
    line-height: 40px;
    width: 100%;
}
.ctit em{
    border-bottom: 2px solid #ff6000;
    color: #ff6000;
    font-size: 16px;
    font-weight: bold;
    display: inline-block;
    font-style: normal;
    line-height: 38px;
}
.quota{
    padding: 15px 0;
}
.quota dl dt{
    float: left;
    color: #999;
    text-align: justify;
    text-align-last: justify;
    font-size: 14px;
    width: 58px;
}
.quota dl dd{
    float: right;
    width: 890px;
}
.quota dl dd p{
    font-size: 14px;
    color: #000000;
}
.bind{
    color: #fff;
    background-color: #51c332;
    padding: 4px 8px; 
    border-radius: 6px;
    margin: 10px;
    cursor: pointer;
    text-decoration: none;
}
.wechat{
    margin: 5px 0;
}
.rules{
    word-wrap: break-word;
}
</style>

