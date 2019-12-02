<template>
    <div class="integral">
        <div class="integral-content containerView-main">
            <!--头部-->
            <div class="integral-content-top">
                <div class="integral-title">
                    <span class="go-back" @click="goBack"></span>
                    <div class="title">我的积分</div>
                </div>
                <div class="integral-msg">
                    <div class="msg-name">
                        获取积分
                    </div>
                    <div class="integral-text" @click.stop="showPopup">
                        积分规则
                    </div>
                </div>
            </div>
            <!--积分内容-->
            <div class="integral-content-txt">
                <div class="integral-box f-bgf">
                    <div class="integral-tit">
                        <div class="integral-tit-l">
                            我的积分
                        </div>
                        <div class="integral-tit-r price" @click="goDetail">
                            积分明细
                        </div>
                    </div>
                    <div class="integral-num">
                        {{integral}}
                    </div>
                </div>
                <div class="claim-integral">
                    <div class="big-btn" @click="drawIntegral">
                        认领积分
                    </div>
                </div>
            </div>
        </div>
        <van-popup v-model="show" position="bottom" close-icon-position>
            <div class="popup-top">
                积分规则
                <div class="popup-close" @click.stop="closePopup"></div>
            </div>
            <div>
                <!-- <p class="title">礼品.商标积分使用规则：</p> -->
                <p>1、账户积分仅限“www.礼品.商标”内使用，不设兑现及转让；</p>
                <p>2、当剩余积分不足以支付订单时，可通过“积分+现金”的方式支付订单（1积分=1元），在线交易方式支持：支付宝、银联；</p>
                <p>3、订单消费中，使用积分的部分不开具发票，仅针对使用现金支付的部分开具发票；</p>
                <p>4、积分兑换规则以本平台公布的最新版本为准，最终解释权归本平台所有。</p>
            </div>
        </van-popup>
    </div>
</template>
<script>
export default {
    name:'integral',
    data() {
        return {
            integral:0,//积分
            show:false,//规则弹框
        }
    },
    created () {
        this.init();//初始化
    },
    methods: {
        //获取初始数据
        init(){
            this.$axios.post(`/v1/home/integral?token=${sessionStorage.token}`).then((res)=>{
                let data=res.data.data;
                if(data.code===1000){
                    this.integral=data.integral;
                }
            })
        },
        //返回上一页
        goBack(){
            this.$router.push({
                path:'/user'
            })
        },
        //前往积分明细
        goDetail(){
            this.$router.push({
                path:'/integralDetail'
            })
        },
        //认领积分
        drawIntegral(){
            this.$router.push({
                path:'/drawIntegral'
            })
        },
        //显示积分规则
        showPopup(){
            this.show=true;
        },
        //隐藏积分规则
        closePopup(){
            this.show=false;
        }
    },
}
</script>