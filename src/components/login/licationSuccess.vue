<template>
    <div class="paySuccess licationSuccess">
        <!--头部-->
        <nav-bar :title="title" :border=border url="/login" :leftArrow=leftArrow></nav-bar>
        <!--内容-->
        <div class="pay-content containerView-main">
            <div class="pay-content-bg">
                <img :src="payBgImg" alt="">
            </div>
            <div class="pay-content-title">提交成功</div>
            <div class="pay-content-price">
                提交申请 => 等待审核 => 成功入驻
            </div>
            <div class="pay-content-price">
                {{data.content}}
            </div>
            <div class="lication-tips">
                <p>申请进度查询：</p>
                <p>{{data.phone}}</p>
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