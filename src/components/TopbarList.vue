<!--
 * @Author:      cyzeng
 * @DateTime:    2017-07-24 13:53:30
 * @Description: topbar以及内容区域
 -->

<template>
  <div class="headerBox">
    <div class="nav clearFloat">
      <div class="left fl">
        <span :class="[idx == 1 && !isNews ? 'border':'']" @click="nav" :data-hi ="1">概览</span>
        <span :class="[idx == 2 && !isNews ? 'border':'']" @click="nav" :data-hi ="2">表现</span>
        <span :class="[idx == 3 && !isNews ? 'border':'']" @click="checkNav" :data-hi ="3">震荡指标</span>
        <span :class="[idx == 4 && !isNews ? 'border':'']" @click="checkNav" :data-hi ="4">跟随趋势</span>
        <!-- <span :class="[isNews? 'border':'']" @click='goNews'>快讯</span> -->
      </div>
      <div v-if="!isNews" class="right fr">
          <div class="item">USD</div>
          <div class="item yuanBox" @click='yuandian'>
              <div class="yuan" @click='yuandian' :class="[yuan == true ? 'left' : 'right']"></div>
          </div>
          <div class="item">BTC</div>
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
  import { mapState } from 'vuex';
  import LoginVue from '@Components/LoginVue';
  export default {
    props: ['navData'],
    data() {
      return {


        //相关模态框开关
        dialogs: {
          gologin: false,
          editPassWordDialog: false,
        },
        keywords: '',
        idx: 1,
        _idx: 1,
        yuan: true,
        isNews: false
      }
    },
    created(){   
      
    },
    mounted(){
       if(this.$route.name == 'news'){
        this.isNews = true;
      }else{
        this.isNews = false;
      }    
      this.idx = this.listStatus;
      // console.log(this.idx,this.isNews)

      this.$store.commit('common/setKeywords', '');
      
      this.$store.commit('common/setRight', 'USD$');
    },
    computed: mapState({
      // 名字
      username: state => state.login.userInfo.username,
      
      token: state => state.login.userInfo.token,
      isVip: state => state.login.isVip,

      // 代理商ID
      agentCode: state => state.login.userInfo.agent_code,

      // 面包屑
      bread: state => state.common.bread,
      listStatus: state => state.common.listStatus,

      keywordChange(){
        // let keywords = this.keywords;
        // console.log(this.keywords)
      }

    }),
    methods: {
      logout(){
        this.$store.commit('login/setUserInfo', {});
      },

      nav(e){
        // console.log(e.target.dataset.hi)
        this.idx = e.target.dataset.hi

        this.$store.commit('common/setlistStatus', this.idx);
        this.$router.push({name:'report'});
        this.isNews = false;
      },

      // 检测是否登录
      checkNav(e){
        
        if(this.token){
          this._idx = e.target.dataset.hi;
          this.idx = this._idx;
          this.isNews = false;
          this.$store.commit('common/setlistStatus', this.idx);
          this.$router.push({name:'report'});
          // if(this.isVip == 'true'){
          //   this.idx = this._idx;
          //   this.$store.commit('common/setlistStatus', this.idx);
          // }else{
          //   this._isVip(this.token);
          // }          
          
        }else{
          this.$message.warning('请先登录！');
        }
      },

      // 快讯--是否登录--是否为vip用户
      goNews(e){        

        if(this.token){
          if(this.isVip == 'true'){
            this.$router.push({name:'news'});
            this.isNews = true;
          }else{
            this._isVip(this.token);
          }          
          
        }else{
          this.$message.warning('请先登录！');
        }

      },

      // 判断是否为vip
      _isVip(token){
        let parmas = {
          token: token
        }
        this.$ajaxQsPost(urls.ISVIP, parmas)
              .then((res)=>{                  
                if( res && res.code == 200){
                  if(res.msg == 'true'){
                    this.$router.push({name:'news'});
                    this.isNews = true;
                  }else{
                    this.$message.warning('您不是会员！');
                  }
                }else{
                  this.$message.warning('您不是会员！');
                }
        })
      },

      change(e){
        // console.log(e.target.value)
        let keywords = e.target.value;
        
        this.$store.commit('common/setKeywords', this.keywords);
      },

      //圆点左右滑动
      yuandian(){
          this.yuan = !this.yuan
          if(this.yuan == true){
              this.right = 'USD$'
          }else if(this.yuan == false){
              this.right = 'BTC$'
          }
          // console.log(this.yuan)
          this.$store.commit('common/setRight', this.right);
      },

      // 登录
      login(){
        this.dialogs.login = true;
        this.$refs.login.$emit('gologin', 1);
      },

      // 登录
      register(){
        this.dialogs.login = true;
        this.$refs.login.$emit('gologin', 2);
      },

      // 个人中心
      personal(){
        this.$router.push({name:'basic'});
      }

    },
    components: {
      LoginVue
    }
  }

</script>



