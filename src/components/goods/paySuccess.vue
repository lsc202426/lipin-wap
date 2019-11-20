<template>
    <div class="paySuccess">
        <!--头部-->
        <nav-bar :title="title" :border=border :leftArrow=leftArrow></nav-bar>
        <!--内容-->
        <div class="pay-content">
            <div class="pay-content-bg">
                <img :src="payBgImg" alt="">
            </div>
            <div class="pay-content-title">{{payTxt}}</div>
            <div class="pay-content-price">
                订单金额：<span class="price">￥{{price}}</span>
            </div>
            <div class="pay-content-btn">
                <div class="seet-order f-bgc1">查看订单</div>
                <div class="go-index">回首页</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'paySuccess',
    data() {
        return {
            title:'支付成功',
            border:true,
            leftArrow:false,
            payBgImg:require("@/assets/images/paySuccess_bg.png"),
            payTxt:'订单支付成功',//订单支付结果
            price:645.00,

        }
    },
    created () {
        
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
}
</script>