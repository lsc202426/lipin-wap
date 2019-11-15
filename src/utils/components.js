/*
*注册公共组件
*/

// 公共头部
import NavBar from '@/components/common/navBar.vue'
// 公共底部
import TabBar from '@/components/common/tabBar.vue'
// 暂无数据
import NoData from '@/components/common/noData.vue'
// 预选积分
import PrimaryBox from '@/components/common/primaryBox.vue'
// 预选底部
import PrimaryBar from '@/components/common/primaryBar.vue'

export default Vue => {
  Vue.component('navBar', NavBar)// 公共头部
  Vue.component('tabBar', TabBar)// 公共底部
  Vue.component('noData', NoData)// 暂无数据
  Vue.component('primaryBox', PrimaryBox)// 预选积分
  Vue.component('primaryBar', PrimaryBar)// 预选底部
}
