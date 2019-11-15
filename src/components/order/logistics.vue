<template>
    <div class="logistics">
        <!--头部-->
        <nav-bar title="查看物流" :border=border :leftArrow=leftArrow></nav-bar>
        <div class="logistics-content">
            <!--订单信息-->
            <div class="logistics-order f-mgb f-bgf">
                <div class="logistics-order-img">
                    <img v-lazy="img" alt="">
                    <span>共2件商品</span>
                </div>
                <div class="logistics-order-txt">
                    <div class="logistics-order-title">物流状态：<span>运输中</span></div>
                    <div>承运来源：圆通速递</div>
                    <div>快递单号：26862183612166</div>
                    <div>官方电话：400-68461-723</div>
                </div>
            </div>
            <!--物流信息-->
            <div class="logistics-msg f-mgb f-bgf">
                <van-steps direction="vertical" :active="0">
                    <van-step>
                        <h3>【城市】物流状态1</h3>
                        <p>2016-07-12 12:40</p>
                    </van-step>
                    <van-step>
                        <h3>【城市】物流状态2</h3>
                        <p>2016-07-11 10:00</p>
                    </van-step>
                    <van-step>
                        <h3>快件已发货</h3>
                        <p>2016-07-10 09:30</p>
                    </van-step>
                </van-steps>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'logistics',
    data() {
        return {
            border: true,
            leftArrow:true,
            img:require("@/assets/images/05.png"),
        }
    },
}
</script>