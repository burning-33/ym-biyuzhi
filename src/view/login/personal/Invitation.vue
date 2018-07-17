<!--
 * @Author:      cyzeng
 * @DateTime:    2017-07-24 13:53:30
 * @Description: topbar以及内容区域
 -->

<template>

<div class="clearfix">
    <div class="ctit">
        <em>立即邀请</em>
    </div>
    <div class="quota clear">
        <div class="tit">您的邀请码</div>
        <div class="inivate" id="copyText" v-if="invite_code">{{invite_code}}</div>
        <div class="inivate" v-else>暂无邀请码</div>
        <div class="btnBox bdsharebuttonbox">
            <button class="btn btn-default ch_btn_blue" @click="copy">
                复制
            </button>
            
            <!-- <button class="btn btn-default ch_btn_blue big_screen" style="position:relative;">
                <img src="/agentStatic/img/wei.png" alt="">                 
                <a href="#" class="bds_weixin big_screen_a" data-cmd="weixin"></a>
                微信
            </button>    -->
            
            
            <button class="btn btn-default ch_btn_blue little_screen" @click="call2('qqFriend')">
                 <img src="/agentStatic/img/QQ.png" alt="">QQ
                
            </button>

            <button class="btn btn-default ch_btn_blue big_screen" style="position:relative;">
                <img src="/agentStatic/img/QQ.png" alt="">QQ               
                <a href="#" class="popup_sqq big_screen_a" data-cmd="sqq"></a>
            </button>   


            <button class="btn btn-default ch_btn_blue" @click="call2('weibo')">
                 <img src="/agentStatic/img/weibo.png" alt="">
                微博
            </button>
        </div>
        <div class="code_qs clearfix">
            <div class="codess">
                <img :src="codeUrl" alt="">
            </div>
            <div class="rules">
                <div>规则说明</div>
                <p v-html='rule'></p>
            </div>

            
        </div>
    </div>

</div>

</template>
<script>
  import {
          urls,
          baseUrl} from '@Util/axiosConfig';
  //加载相关依赖
import NativeShare from 'nativeshare'
import { mapState } from 'vuex';
import LoginVue from '@Components/LoginVue';
export default {
    props: ['navData'],
    data() {
      return {

        //   邀请码
        invite_code: '',

        // 二维码
        codeUrl: '',

        rule: '',

        // nativeShare: {},

      }
    },
    mounted(){

        this.invites();

        
        setTimeout(()=>{
            this.pcShare();
        },500)


    },
    computed: mapState({
        user: state => state.login.userInfo,

    }),
    methods: {

         // 邀请
        invites(){
            let params = {
                token: this.user.token
            };
            this.$ajaxGet(urls.INVITE, params)
                .then((res)=>{
                  if( res && res.code == 200){
                          this.codeUrl = res.data.qrcode;
                          this.rule = res.data.rule;
                          this.invite_code = res.data.invite_code;
                          this.initShare();
                  }else{
                    this.$message.error(res.msg);
                  }
            })
        },

        pcShare(){
            this.$nextTick(function () {
                "use strict";
                window._bd_share_config={
                    "common":{
                    // onBeforeClick:SetShare,
                    "bdSnsKey":{},
                    "bdText":"币预知",
                    "bdDesc": '币预知的邀请码',
                    "bdUrl":baseUrl + '#/register/' + this.invite_code,
                    "bdMini":"1",
                    "bdMiniList":false,
                    "bdPic":baseUrl + "agentStatic/img/logoyidong.png",
                    "bdStyle":"1",
                    "bdSize":"32"
                    },
                    // slide : [{	   
                    //     bdImg : 0,
                    //     bdPos : "right",
                    //     bdTop : 100
                    // }],
                    image : [{
                        viewType : 'list',
                        viewPos : 'top',
                        viewColor : 'black',
                        viewSize : '16',
                        viewList : ['qzone','tsina','huaban','tqq','renren']
                    }],
                    selectShare : [{
                        "bdselectMiniList" : ['qzone','tqq','kaixin001','bdxc','tqf']
                    }],
                    "share":[{
                        "bdSize" : 16
                    }]
                }
                
                [(document.querySelector('head') || document.querySelector('body')).appendChild(document.createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=' + ~ ( - new Date() / 36e5)];

            })
        },

        initShare(){

            this.nativeShare = new NativeShare()
            var shareData = {
                title: '币预知',
                desc: '币预知',
                // 如果是微信该link的域名必须要在微信后台配置的安全域名之内的。
                link: baseUrl + '#/register/' + this.invite_code,
                icon: baseUrl + 'agentStatic/img/logoyidong.png',
                // 不要过于依赖以下两个回调，很多浏览器是不支持的
                success: function() {
                    alert('success')
                },
                fail: function() {
                    alert('fail')
                }
            }
            this.nativeShare.setShareData(shareData)

        },

        copy(){
            const range = document.createRange();
            range.selectNode(document.getElementById('copyText'));
    
            const selection = window.getSelection();
            if(selection.rangeCount > 0) selection.removeAllRanges();
            selection.addRange(range);
            document.execCommand('copy');
        },

        call2(command) {
            
            try {
                this.nativeShare.call(command)
            } catch (err) {
                // 如果不支持，你可以在这里做降级处理
                // alert(err.message)
                alert('不支持分享，请用QQ浏览器或者UC浏览器打开')
            }
        },

        setTitle(title) {
            this.nativeShare.setShareData({
                title: title,
            })
        },



    },
    components: {
      
    }
  }

</script>


<style scoped lang='less'>
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
    .tit{
        text-align: center;
    }
    .inivate{
        font-size: 30px;
        color: #3bb3e4;
        text-align: center;
        margin-top:20px;
    }

    .btnBox{
        text-align: center;
        margin-top:30px;
        
    }
    .btn{
        margin:0 15px;
        margin-bottom: 15px;
        width:78px;
        img{
            width:20px;
            height: 20px;
        }
    }
    

    .code_qs{
        padding-top:40px;
        width:408px;
        margin:0 auto;
        .codess{
            float: left;
            display: inline-block;
            width:150px;
            height: 150px;
            margin-right: 20px;
            border:1px solid #ddd;
            border-radius: 4px;
            padding:5px;
            img{
                width:100%;
                height: 100%;
            }
        }
        .rules{
            width: 230px;
            float: left;
            display: inline-block;
            div{
                text-align: center;
            }
            p{
                word-wrap: break-word;
            }
        }
    }

    .big_screen_a{
        width: 78px;
        height: 34px;
        left: 0;
        top: 0;
        background: none;
        display: inline-block;
        padding-left: 0px;
        margin: 0px;
        margin-bottom: 15px;
        position: absolute;
        // background-position: 12px 8px;
        // top:-7px;s
        
    }
}





// 大屏幕
@media only screen and (min-width: 1040px) {
    .little_screen{
        display:none;
    }
}


/*移动端*/
@media only screen and (max-width: 1039px){
    .quota{
        .code_qs{
            width:100%;
            text-align: center;
            .codess{
                float: inherit;
                margin: auto;
            }
            .rules{
                width:100%;
                margin-top:20px;
                margin-bottom: 10px;
                p{
                    text-align: left;
                }
            }
        }
    }
    
    .big_screen{
        display:none;
    }

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

.mintxt{
    width: 944px;
    padding: 10px;
    font-size: 14px;
    line-height: 24px;
    border:1px solid #eee;
}
.message{
    position: relative;
    margin-top:20px;
}
.minbut{
    background: #1aad19;
    font-size:16px;
    color:#fff;
    border-radius:5px;
    line-height: 46px;
    display: inline-block;
    padding: 0 50px;
    text-decoration: none;
    position: fixed;
    left: 50%;
}
</style>

