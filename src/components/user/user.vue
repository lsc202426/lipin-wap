<template>
    <div class="user">
        <div class="user-content containerView-main">
            <!--头部-->
            <div class="user-top">
                <div class="user-top-set">
                    <div class="set-img">
                        <img @click.stop="goSet" :src="setImg" alt="">
                    </div>
                    <div class="msg-img">
                        <img @click.stop="goMsg" :src="msgImg" alt="">
                        <span v-if="data.unread_msg"></span>
                    </div>
                </div>
                <div class="user-msg">
                    <div class="user-msg-txt">
                        <div class="user-msg-head">
                            <img :src="headImg" alt="">
                        </div>
                        <div class="user-msg-name">
                            <!-- <div class="name">{{data.username}}</div> -->
                            <div class="phone">{{data.mobile_phone}}</div>
                        </div>
                    </div>
                    <div class="user-msg-integral" @click.stop="goIntegral">
                        <span>我的积分：{{data.integral}}</span>
                    </div>
                </div>
            </div>
            <!--订单部分-->
            <div class="user-order f-bgf f-mgb">
                <div class="user-order-title f-bdb" @click="goOrderList(0)">
                    <div class="title-l">
                        我的订单
                    </div>
                    <div class="arrow-right"></div>
                </div>
                <div class="order-list-icon">
                    <div class="icon-item" @click="goOrderList(0)">
                        <div class="icon-bg icon-bg1"></div>
                        <span>全部订单</span>
                    </div>
                    <div class="icon-item" @click="goOrderList(1)">
                        <div class="icon-bg icon-bg2"></div>
                        <span>待付款</span>
                    </div>
                    <div class="icon-item" @click="goOrderList(2)">
                        <div class="icon-bg icon-bg3"></div>
                        <span>待收货</span>
                    </div>
                </div>
            </div>
            <!--导航栏目-->
            <div class="user-tab-list f-bgf f-mgb">
                <div class="user-tab-item f-bdb" @click="goCollect">
                    <div class="user-tab-l">
                        <span class="tab-item-bg tab-item-bg1"></span>
                        <span>我的收藏</span>
                    </div>
                    <div class="arrow-right"></div>
                </div>
                <div class="user-tab-item f-bdb" @click="goIntegral">
                    <div class="user-tab-l">
                        <span class="tab-item-bg tab-item-bg2"></span>
                        <span>我的积分</span>
                    </div>
                    <div class="arrow-right"></div>
                </div>
                <div v-if="data.type==='商务'" class="user-tab-item" @click="goGiftLication">
                    <div class="user-tab-l">
                        <span class="tab-item-bg tab-item-bg3"></span>
                        <span>礼品预购买</span>
                    </div>
                    <div class="arrow-right"></div>
                </div>
            </div>
            <!--退出登陆按钮-->
            <div class="sign-out" @click.stop="signOut">
                <div class="big-btn">退出登录</div>
            </div>
        </div>
        <!--底部导航-->
        <tab-bar></tab-bar>
        <!-- <primary-bar></primary-bar> -->
    </div>
</template>
<script>
import { clearSession } from "@/utils/index";
export default {
    name:'user',
    data(){
        return{
            border:false,
            setImg:require("@/assets/images/icon_shezhi@2x.png"),//设置icon
            msgImg:require("@/assets/images/icon_xiaoxi_wu@2x.png"),//消息icon
            headImg:require("@/assets/images/user_head@2x.png"),//头像
            data:{},//我的信息
        }
    },
    created() {
        clearSession(); //清除会话内容
        this.init();//初始化获取数据
    },
    methods: {
        //获取初始数据
        init(){
            this.$axios.post(`/v1/home/info?token=${sessionStorage.token}`).then((res)=>{
                let data=res.data.data;
                if(data.code===1000){
                    this.data=data.info;
                }
            })
        },
        //前往设置
        goSet() {
            this.$router.push({
                path:'/setting'
            })
        },
        //前往消息
        goMsg(){
            sessionStorage.beforPath='user';
            this.$router.push({
                path:'/news',
            });
        },
        //前往我的积分
        goIntegral(){
            this.$router.push({
                path:'/integral'
            })
        },
        //前往订单列表
        goOrderList(i){
            this.$router.push({
                path:'/order',
                query:{
                    state:i
                }
            })
        },
        //前往我的收藏
        goCollect(){
            this.$router.push({
                path:'/collect',
            })
        },
        //前往积分预购
        goGiftLication(){
            this.$router.push({
                path:'/giftLication',
            })
        },
        //退出登陆
        signOut(){
            this.$axios.post(`/v1/home/loginOut?token=${sessionStorage.token}`).then((res)=>{
                let data=res.data.data;
                if(data.code===1000){
                    this.$toast({
                        message:'退出登录成功',
                        forbidClick:true
                    })
                    setTimeout(() => {
                        this.$router.push({
                            path:'/login'
                        })
                    }, 2000);
                }
            })
        }
    },
}
</script>