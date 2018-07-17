<!--
 * @Author:      cyzeng
 * @DateTime:    2017-07-24 13:53:30
 * @Description: topbar以及内容区域
 -->

<template>
<div class="header">
  <div class="displayNone">{{keywordChange}}</div>
  <div class="headerBox">
    <div class="headerTop clearFloat">
      <img @click='goindex' :class="[!token ==true?'goleft':'']" src="/agentStatic/img/logo3.png" alt="" class="logo fl">
      <div v-show="$route.name == 'report'" class="sousuoBox clearFloat pcSearch">
        <!-- <select id="twosousuo" style="background-color:#5c6877;margin-left:25px;height:34px;border:none">
          <option style="background-color:#5c6877" selected value="1">商品名称</option>
          <option style="background-color:#5c6877" value="2">商品代码</option>
        </select> -->
        <span style="width:80px;background-color:#5c6877;margin-left:25px;height:34px;line-height:34px;border:none;display:inline-block;text-align:center">商品代码</span>
        <input type="text"  @input="changeinput(0)" placeholder="搜索" class="sousuo fr sousuodisplay" v-model="keywords" >
        <img src="/agentStatic/img/sousuo.png" @click="change" alt="" class="sousuoIcon cur-p">
           <div id="inputbox" style="width:76%;height:auto;max-height:500px;display:none;background:#262b3e;position: absolute;right:0;overflow-y: auto;">
              <p @click="goDetail(arr)" style="cursor:pointer;margin:0px;padding:0px;color:rgb(132, 132, 132);margin-top: 5px;margin-left:10px;font-weight: bold;border-bottom:1px solid #9f9f9f" id="textsousuo" v-for="arr in newcommodity">{{arr}}</p>
              <div @click="off(0)" style="cursor:pointer;width:100%;text-align: center;color:#afafaf; line-height: 30px">关闭</div>
        </div>
      </div>
   
      <div class="dengluBox"> 
        <div class="weidenglu">
          <span v-if="user.username" class="cur-p" @click='personal'>{{user.username}}</span>
          <span v-else class="sign" @click='login'>登录{{user.username}}</span>
          <span v-if="!user.username" class="register" @click='register'>免费注册</span>
        </div>
        <div class="yidenglu">
          <span v-if="user.username" @click="logout">退出！</span>
        </div>
      </div>
      <div v-show="$route.name == 'report'" class="sousuoBox clearFloat sousuodisplays">
       <!-- <select id="twosousuo" class="mg-l0" style="background-color:#5c6877;height:34px;border:none;">
          <option style="background-color:#5c6877" selected value="1">商品名称</option>
          <option style="background-color:#5c6877" value="2">商品代码</option>
        </select> -->
        <span style="width:80px;background-color:#5c6877;height:34px;line-height:34px;border:none;display:inline-block;text-align:center">商品代码</span>
        <input type="text"  @input="changeinput(1)" placeholder="搜索" class="sousuo fr sousuodisplay" v-model="keywords" >
        <img src="/agentStatic/img/sousuo.png" @click="change" alt="" class="sousuoIcon cur-p">
        <div id="inputbox" style="z-index:99;width:69%;height:auto;max-height:300px;display:none;background:#262b3e;position: absolute;right:0;overflow-y: auto; ">
              <p @click="goDetail(arr)" style="cursor:pointer;margin:0px;padding:0px;color:rgb(132, 132, 132);margin-top: 5px;margin-left:10px;font-weight: bold;border-bottom:1px solid #9f9f9f" id="textsousuo" v-for="arr in newcommodity">{{arr}}</p>
              <div @click="off(1)" style="cursor:pointer;width:100%;text-align: center;color:#afafaf; line-height: 30px">关闭</div>
        </div>
      </div>
    </div>

  </div>

  <LoginVue ref='login'></LoginVue>

  <NavVue v-show="user.username"></NavVue>
  
</div>

</template>

<script>
//加载相关依赖
import {
          urls,
          baseUrl} from '@Util/axiosConfig';
import { mapState } from "vuex";
import LoginVue from "@Components/LoginVue";
import NavVue from "@Components/NavVue";
import dealProject from "@Util/dealProject";
import name from "@Util/name";
export default {
  // el:"textsousuo",
  props: ["navData"],
  data() {
    return {
      //相关模态框开关
      dialogs: {
        gologin: false,
        editPassWordDialog: false
      },
      keywords: "",
      idx: 1,
      yuan: true,
      inputsou: "",
      commodity: name,
      newcommodity:[],
      null:'没有数据'
    };
  },
  created() {
    this.$store.commit("common/setKeywords", "");
    this.$store.commit("common/setlistStatus", 1);
    this.$store.commit("common/setRight", "USD$");
    
    this.user.token = localStorage.getItem("token");
    this.user.username = localStorage.getItem("username");
    this.user.is_vip = localStorage.getItem("is_vip");
    this.user.mobile = localStorage.getItem("mobile");
    this.user.openid = localStorage.getItem("openid");
    this.user.uid = localStorage.getItem("uid");
    this.$store.commit('login/setUserInfo', this.user);
    // 有邀请码
    if (this.$route.name == "register") {
      this.register();
    }
  },
  computed: mapState({
    // 名字
    user: state => state.login.userInfo,
    token: state => state.login.userInfo.token,

    // 代理商ID
    agentCode: state => state.login.userInfo.agent_code,

    // 面包屑
    bread: state => state.common.bread,

    keywordChange() {
      // let keywords = this.keywords;
      // console.log(this.keywords)
    }
  }),
  methods: {
    goDetail(name){
      // console.log(name)
      let _this = this
      if(!this.token){
        this.$message.warning('请先登录！');
        return
      }
      let parmas = {
        token: this.token
      }
      this.$ajaxQsPost(urls.ISVIP, parmas)
        .then((res)=>{
          if( res && res.code == 200){
            _this.$store.commit('login/setIsVip', res.msg);
            // this.close()
            name = name.toUpperCase()
            _this.$router.push({
              name:'technicals',
              params: {
                // name: showName
                name: dealProject.dealProject(name)
              }
            });
          }else{
            _this.$message.error('您还不是会员!');
          }
        })
      // let showName = name.split(':')[1];

    },
    logout() {
      this.$store.commit("login/setUserInfo", {});
      window.localStorage.clear();
      this.$router.push({ name: "report" });
    },
    off(id) {
      inputbox[id].style.display = "none";
    },
    goindex() {
      this.$router.push({ name: "report" });
    },

    change(e) {
      // var options = $("#twosousuo option:selected");
      if (!this.keywords) {
        return;
      } else {
        // switch (options.text()) {
        //   case "商品搜索":
        this.$store.commit("common/setKeywords", this.keywords);
      }

      //     break;
      //   case "详情搜索":
      //     // this.$store.commit("common/setKeywords", this.keywords);
      //     console.log(this.keywords)
      // $.ajax({
      //   url: "https://scanner.tradingview.com/crypto/scan",
      //   type: "post",
      //   dataType: "",
      //   success: function(data) {

      //     console.log("//请求之后，响应成功执行")
      //    console.log(data.data[1])
      //   },
      //   error: function() {
      //     console.log(" //请求之后，响应不成功或者有错误执行")

      //     alert("异常！");
      //   }
      // });
      //     console.log("ss");
      //     break;
      // }
    },
    //输入框改变时触发axjx
    changeinput(id) {
      // 获取下拉框文本
      // var options = $("#twosousuo option:selected");
      // if (options.text() == "商品代码") {
        inputbox[id].style.display = "block";
          var arrs =[];
          var text = this.keywords.toUpperCase()
        for(let i=0;i<this.commodity.length;i++){
            if(this.commodity[i].search(text) !=-1){
              arrs.push(this.commodity[i])
            }
          }
          // console.log(arrs)
          this.newcommodity = arrs
      // }
      // if (options.text() == "详情搜索") {
      //   inputbox.style.display = "block";
        //  let keywords=this.keywords

        // this.$store.commit("common/setKeywords", this.keywords);
        // $.ajax({
        //     url: "http://adminbi.yuzhi.link/search",
        //     type: "GET",
        //     data:{keyword:this.keywords},
        //     dataType:'',
        //     success: function(data) {
        //       console.log(data)
        //     //  console.log(data.data)
        //     },
        //     error: function() {
        //       // console.log(data.data)

        //     }
        //   });
        //   console.log(this.data)
        // console.log(this.keywords)
      
            // console.log(this.commodity[].name)
                // console.log(this.commodity[0].name.search(this.keywords)==-1)
        // for(let i=0;i<this.commodity.length;i++){
     
  
        //     if(this.commodity[i].name.search(this.keywords)==-1){
        //        console.log(this.commodity[i].name)
        //       // this.commodity[i].push(this.newcommodity)
        //         console.log(this.commodity[i])
        //         // this.commodity[i].push(this.newcommodity)
        //         // console.log(this.newcommodity)
        //         //  this.newcommodity.push(this.commodity[i])
        // this.commodity[i].name.push(this.newcommodity)
        // return;
        //     }else{
        //       return;
        //     }
          
      //  console.log(this.commodity[0].name)
      //  console.log(this.keywords)
      //  console.log(this.commodity[0].name.indexOf(this.keywords))
      //  console.log($.inArray(this.keywords,this.commodity))
   
        // }
          // console.log(this.commodity[0].name)
          // let arr=this.commodity[0].name
       
      //     for(let i=0;i<this.commodity.length;i++){
      //       console.log(this.commodity[i])
      //     }
          

      // }
  
    },

    //圆点左右滑动
    yuandian() {
      this.yuan = !this.yuan;
      if (this.yuan == true) {
        this.right = "USD$";
      } else if (this.yuan == false) {
        this.right = "BTC$";
      }
      this.$store.commit("common/setRight", this.right);
    },

    // 登录
    login() {
      this.dialogs.login = true;
      this.$refs.login.$emit("gologin", 1);
    },

    // 登录
    register() {
      this.dialogs.login = true;
      this.$refs.login.$emit("gologin", 2);
    },

    // 个人中心
    personal() {
      this.$router.push({ name: "basic" });
    }
  },
  components: {
    LoginVue,
    NavVue
  }
};
</script>



