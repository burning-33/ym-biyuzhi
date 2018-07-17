<!--
 * @Author:      yyz
 * @DateTime:    2018-7-10 10:52:42
 * @Description: 微信绑定
 -->
 <template>
     <div class="bind">
     </div>
 </template>
 
 <script>
 import {
          urls,
          baseUrl} from '@Util/axiosConfig';
 import { mapState } from 'vuex';
 export default {
     data(){
         return{
             code:''
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
        this.code = theRequest.code;
        } 
        this.bind();
    },
     computed: mapState({
         // 名字
      user: state => state.login.userInfo
     }),
     methods:{
         bind(){
             let _this = this;
             let params = {
                token: this.user.token,
                code:this.code
            };
              _this.$ajaxQsPost(urls.BIND,params)
                .then((res)=>{
                    if( res && res.code == 200){
                        this.$message.success(res.msg);
                        this.$router.replace({
                            name:'basic',
                            params:{
                                success:true
                            }
                        })
                    }else{
                        this.$message.error(res.msg);
                    }
                    
                })
         }
     }
 }
 </script>
 
 <style>
 
 </style>
 