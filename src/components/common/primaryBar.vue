<template>
  <van-tabbar v-model="active" active-color="#FF6702" inactive-color="#666" @change="changeActive">
    <van-tabbar-item to="/">
      <span>首页</span>
      <img slot="icon" slot-scope="props" :src="props.active ? icon0.active : icon0.inactive" />
    </van-tabbar-item>
    <van-tabbar-item to="/shopCart">
      <span>预选清单</span>
      <img slot="icon" slot-scope="props" :src="props.active ? icon1.active : icon1.inactive" />
    </van-tabbar-item>
    <van-tabbar-item>
      <span>退出预选</span>
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
        active: require("@/assets/images/icon_qingdan@2x1.png"),
        inactive: require("@/assets/images/icon_qingdan@2x.png")
      },
      icon2: {
        active: require("@/assets/images/icon_tuichu@2x1.png"),
        inactive: require("@/assets/images/icon_tuichu@2x.png")
      }
    };
  },
  methods: {
      changeActive() {
          if(this.active===2){
              //退出预览
              
          }
      }
  },
};
</script>