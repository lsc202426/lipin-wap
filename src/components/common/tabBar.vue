<template>
  <van-tabbar v-model="active" active-color="#FF6702" inactive-color="#666">
    <van-tabbar-item to="/">
      <span>首页</span>
      <img slot="icon" slot-scope="props" :src="props.active ? icon0.active : icon0.inactive" />
    </van-tabbar-item>
    <van-tabbar-item to="/shopCart">
      <span>购物车</span>
      <img slot="icon" slot-scope="props" :src="props.active ? icon1.active : icon1.inactive" />
    </van-tabbar-item>
    <van-tabbar-item to="/user">
      <span>我</span>
      <img slot="icon" slot-scope="props" :src="props.active ? icon2.active : icon2.inactive" />
    </van-tabbar-item>
  </van-tabbar>
</template>
<script>
export default {
  data() {
    return {
        active:this.$Store.state.menuShow,
      icon0: {
        active: require("@/assets/images/icon_shouye_xuanzhong@2x.png"),
        inactive: require("@/assets/images/icon_shouye_weixuanzhong@2x.png")
      },
      icon1: {
        active: require("@/assets/images/icon_gouwuche_xuanle@2x.png"),
        inactive: require("@/assets/images/icon_gouwuche_weixuan@2x.png")
      },
      icon2: {
        active: require("@/assets/images/icon_wo_xuanle@2x.png"),
        inactive: require("@/assets/images/icon_wo_weixuan@2x.png")
      }
    };
  },
};
</script>