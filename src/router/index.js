import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../components/index.vue'
import Store from '@/store/index'

Vue.use(VueRouter)

const routes = [
  // 首页
  {
    path: '/',
    name: 'index',
    component: Index
  },
  // 购物车
  {
    path: '/shopCart',
    name: 'shopCart',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/shopCart/shopCart.vue'),
    meta: {
      requireAuth: true
    }
  },
  // 我的
  {
    path: '/user',
    name: 'user',
    component: () => import('../components/user/user.vue'),
    meta: {
      requireAuth: true
    }
  },
  // 商品、详情
  {
    path: '/goodsContent',
    name: 'goodsContent',
    component: () => import('../components/goods/goodsContent.vue')
  },
  // 搜索结果
  {
    path: '/searchResult',
    name: 'searchResult',
    component: () => import('../components/search/searchResult.vue')
  },
  // 结算
  {
    path: '/settle',
    name: 'settle',
    component: () => import('../components/goods/settle.vue')
  },
  // 消息
  {
    path: '/news',
    name: 'news',
    component: () => import('../components/news/news.vue'),
    meta: {
      requireAuth: true
    }
  },
  // 积分
  {
    path: '/integral',
    name: 'integral',
    component: () => import('../components/integral/integral.vue'),
    meta: {
      requireAuth: true
    }
  },
  // 积分明细
  {
    path: '/integralDetail',
    name: 'integralDetail',
    component: () => import('../components/integral/integralDetail.vue'),
    meta: {
      requireAuth: true
    }
  },
  // 认领积分
  {
    path: '/drawIntegral',
    name: 'drawIntegral',
    component: () => import('../components/integral/drawIntegral.vue'),
    meta: {
      requireAuth: true
    }
  },
  // 订单列表
  {
    path: '/order',
    name: 'order',
    component: () => import('../components/order/order.vue'),
    meta: {
      requireAuth: true
    }
  },
  // 物流信息
  {
    path: '/logistics',
    name: 'logistics',
    component: () => import('../components/order/logistics.vue'),
    meta: {
      requireAuth: true
    }
  },
  // 我的地址
  {
    path: '/myAddress',
    name: 'myAddress',
    component: () => import('../components/user/myAddress.vue'),
    meta: {
      requireAuth: true
    }
  },
  // 新增地址
  {
    path: '/addSite',
    name: 'addSite',
    component: () => import('../components/user/addSite.vue'),
    meta: {
      requireAuth: true
    }
  },
  // 我的收藏
  {
    path: '/collect',
    name: 'collect',
    component: () => import('../components/user/collect.vue'),
    meta: {
      requireAuth: true
    }
  },
  // 设置
  {
    path: '/setting',
    name: 'setting',
    component: () => import('../components/user/setting.vue'),
    meta: {
      requireAuth: true
    }
  },
  // 礼品申请
  {
    path: '/giftLication',
    name: 'giftLication',
    component: () => import('../components/user/giftLication.vue'),
    meta: {
      requireAuth: true
    }
  },
  // 申请过的礼品
  {
    path: '/giftList',
    name: 'giftList',
    component: () => import('../components/user/giftList.vue'),
    meta: {
      requireAuth: true
    }
  },
  // 登录
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/login/login.vue')
  },
  // 注册
  {
    path: '/register',
    name: 'register',
    component: () => import('../components/login/register.vue')
  },
  // 忘记密码
  {
    path: '/forgetPass',
    name: 'forgetPass',
    component: () => import('../components/login/forgetPass.vue')
  },
  // 修改手机号
  {
    path: '/modifyPhone',
    name: 'modifyPhone',
    component: () => import('../components/user/modifyPhone.vue'),
    meta: {
      requireAuth: true
    }
  },
  // 修改密码
  {
    path: '/modifyPass',
    name: 'modifyPass',
    component: () => import('../components/user/modifyPass.vue'),
    meta: {
      requireAuth: true
    }
  },
  // 支付成功
  {
    path: '/paySuccess',
    name: 'paySuccess',
    component: () => import('../components/goods/paySuccess.vue')
  },
  // 订单详情
  {
    path: '/orderDetail',
    name: 'orderDetail',
    component: () => import('../components/order/orderDetail.vue'),
    meta: {
      requireAuth: true
    }
  },
  // 消息详情
  {
    path: '/newsDetail',
    name: 'newsDetail',
    component: () => import('../components/news/newsDetail.vue'),
    meta: {
      requireAuth: true
    }
  },
  // 申请入驻
  {
    path: '/licationSettle',
    name: 'licationSettle',
    component: () => import('../components/login/licationSettle.vue')
  },
  // 申请入驻
  {
    path: '/licationSuccess',
    name: 'licationSuccess',
    component: () => import('../components/login/licationSuccess.vue')
  },
  // 入驻供货商
  {
    path: '/licationGain',
    name: 'licationGain',
    component: () => import('../components/login/licationGain.vue')
  },
  // 评价中心
  {
    path: '/evaluateContent',
    name: 'evaluateContent',
    component: () => import('../components/user/evaluateContent.vue'),
    meta: {
      requireAuth: true
    }
  },
  // 评价列表
  {
    path: '/evaluateList',
    name: 'evaluateList',
    component: () => import('../components/goods/evaluateList.vue'),
    meta: {
      requireAuth: true
    }
  },
  // 评价详情
  {
    path: '/evaluateDetail',
    name: 'evaluateDetail',
    component: () => import('../components/goods/evaluateDetail.vue'),
    meta: {
      requireAuth: true
    }
  },
  // 发表评价
  {
    path: '/publishEvaluate',
    name: 'publishEvaluate',
    component: () => import('../components/user/publishEvaluate.vue'),
    meta: {
      requireAuth: true
    }
  },
  // 评价成功
  {
    path: '/evaluateSuccess',
    name: 'evaluateSuccess',
    component: () => import('../components/user/evaluateSuccess.vue'),
    meta: {
      requireAuth: true
    }
  },
  // 编辑地址
  {
    path: '/editSite',
    name: 'editSite',
    component: () => import('../components/user/editSite.vue'),
    meta: {
      requireAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 验证是否需要登录
router.beforeEach((to, from, next) => {
  // 监听路由设置当前路由底部菜单高亮
  Store.commit('changeMenu', to.name)
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (sessionStorage.getItem('token')) {
      next()
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  } else {
    next()
  }
  next()
})
router.afterEach((to, from) => {
  document.documentElement.scrollTop = 0
})

export default router
