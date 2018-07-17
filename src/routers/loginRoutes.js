/**
 * @Author:      cyzeng
 * @DateTime:    2017-06-16 23:11:25
 * @Description: 登录路由
 */
const index = r => require.ensure( [], () => r(require('@Src/view/login/index')), 'index');
// const login = r => require.ensure( [], () => r(require('@Src/view/login/login')), 'login');
// const forgetPasswd = r => require.ensure( [], () => r(require('@Src/view/login/forgetPasswd')), 'forgetPasswd');

const report = r => require.ensure( [], () => r(require('@Src/view/login/list')), 'report');
const technicals = r => require.ensure( [], () => r(require('@Src/view/login/technicals')), 'technicals');
const personal = r => require.ensure( [], () => r(require('@Src/view/login/personal')), 'personal');
const basicVue = r => require.ensure( [], () => r(require('@Src/view/login/personal/BasicVue')), 'BasicVue');
const member = r => require.ensure( [], () => r(require('@Src/view/login/personal/Member')), 'Member');
const ModifyPassword = r => require.ensure( [], () => r(require('@Src/view/login/personal/ModifyPassword')), 'ModifyPassword');
const Invitation = r => require.ensure( [], () => r(require('@Src/view/login/personal/Invitation')), 'Invitation');
const Number = r => require.ensure( [], () => r(require('@Src/view/login/personal/Number')), 'Number');
const Follow = r => require.ensure( [], () => r(require('@Src/view/login/personal/Follow')), 'Follow');
const Bind = r => require.ensure( [], () => r(require('@Src/view/login/personal/Bind')), 'Bind');
const news = r => require.ensure( [], () => r(require('@Src/view/login/news')), 'news');

const demo = r => require.ensure( [], () => r(require('@Src/view/login/demo')), 'demo');

export default [
  
  {
    path: '/',
    name: 'index',
    component: index,
    children: [
      {
        path: '/',
        name: 'report',
        component: report,
      },
      {
        path: '/register/:code',
        name: 'register',
        component: report,
      },
      {
        path: '/technicals/:name',
        name: 'technicals',
        component: technicals,
      },
      {
        path: '/personal',
        name: 'personal',
        component: personal,
        children: [
          {
            path: 'basic',
            name:'basic',
            component: basicVue
          },
          {
            path: 'member',
            name:'member',
            component: member
          },
          {
            path: 'modifyPassword',
            name:'modifyPassword',
            component: ModifyPassword
          },
          {
            path: 'invitation',
            name:'invitation',
            component: Invitation
          },
          {
            path: 'number',
            name:'number',
            component: Number
          },
          {
            path: 'bind',
            name:'bind',
            component: Bind
          },
          {
            path: 'follow',
            name:'follow',
            component: Follow
          },

        ]
      },
      {
        path: '/news',
        name: 'news',
        component: news,
      },
      {
        path: '/demo',
        name: 'demo',
        component: demo,
      },
    ]
  },


]

