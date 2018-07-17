/*
 * @Author:      changh
 * @DateTime:    2018-5-14
 * @Description: 请求路径
 */

let base_url = 'http://adminbi.yuzhi.link/';

if (process.env.NODE_ENV == 'production') {
  // 测试部使用的生产环境，上线时改为发布环境
  base_url = 'http://adminbi.yuzhi.link/';

}else{
  // 开发环境
  base_url = 'http://adminbi.yuzhi.link/';
}


export const baseUrl = base_url;

// 所有请求具体url链接
export const urls = {
  BASE_URL: base_url,
  // 登录
  LOGIN: 'login',
  ISVIP: 'isVip',
  SMS: 'sms',
  REGISTER: 'register',
  MEMBER: 'member',
  FOLLOW: 'follow',
  UNFOLLOW: 'unFollow',
  INVITE: 'invite',
  JOINMEMBER: 'joinMember',
  PWD: 'pwd',
  INVITELIST: 'inviteList',
  EXCHANGE: 'exchange',
  BIND: 'bind'
};


