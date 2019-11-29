<template>
    <div class="paySuccess licationSuccess">
        <!--头部-->
        <nav-bar :title="title" :border=border url="/login" :leftArrow=leftArrow></nav-bar>
        <!--内容-->
        <div class="pay-content containerView-main paySuccess-content">
            <div class="pay-content-bg">
                <img :src="payBgImg" alt="">
            </div>
            <div class="pay-content-title">提交成功</div>
            <div class="lication-process">
                <div class="lication-process-img">
                    <img :src="processIcon" alt="">
                </div>
            </div>
            <div class="pay-content-price">
                {{data.content}}
            </div>
            <div class="lication-tips">
                <p>申请进度查询：{{data.phone}}</p>
            </div>
            <!--确定按钮-->
            <div class="lication-btn">
                <div class="big-btn" @click="goIndex">返回首页</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'licationSuccess',
    data() {
        return {
            title:'提交成功',
            border:true,
            leftArrow:true,
            payBgImg:require("@/assets/images/paySuccess_bg.png"),
            processIcon:require("@/assets/images/process_icon.png"),
            payTxt:'',//订单支付结果
            price:0,
            data:{},//内容
        }
    },
    created () {
        if(sessionStorage.content){
            this.data=JSON.parse(sessionStorage.content);
        }
    },
    mounted() {
        //禁用浏览器返回
        (function(){
            if(window.history && window.history.pushState) {
                window.onpopstate=function () {
                        window.history.pushState('forward', null, '');
                        window.history.forward(1);
                };
            }
            window.history.pushState('forward', null, '');//在IE中必须得有这两行
            window.history.forward(1);
        })();
    },
    methods: {
        //返回首页
        goIndex(){
            this.$router.push({
                path:'/'
            })
        }
    },
}
</script>