<template>
    <div class="orderDetail">
        <div class="order-detail-content">
            <!--头部-->
            <div class="settle-top">
                <div class="settle-title">
                    <span class="go-back" @click.stop="goBack"></span>
                    <div class="title">订单详情</div>
                </div>
                <div class="order-detail-title">
                    {{title}}
                </div>
            </div>
            <!--地址信息-->
            <div class="detail-address f-bgf f-mgb">
                <div class="detail-address-img">
                    <img :src="img" alt="">
                </div>
                <div class="detail-address-txt">
                    <div class="txt-name">
                        <span class="name">蕾娜</span>
                        <span class="phone">13800138000</span>
                    </div>
                    <div class="txt-address">
                        广东 广州市 海珠区 滨江街道 怡乐路 奇乐园21号802
                    </div>
                </div>
            </div>
            <!--商品信息-->
            <div class="detail-goods f-mgb f-bgf">
                <div class="detail-goods-title">商品信息</div>
                <div class="detail-goods-item">
                    <div class="item-img-box">
                        <img v-lazy="img" alt="">
                    </div>
                    <div class="item-con-box">
                        <div class="item-con-title">
                            <div class="title">小米电视4A 70英寸</div>
                            <div class="con-price">
                                <span>￥</span>3799
                            </div>
                        </div>
                        <div class="item-con-type">
                            <div>黑色</div>
                            <div>x 1</div>
                        </div>
                    </div>
                </div>
                <div class="f-bdb">
                    <div class="detail-goods-rules">
                        <span>运费</span>
                        <span>￥0.00</span>
                    </div>
                    <div class="detail-goods-rules">
                        <span>积分支付</span>
                        <span>5098</span>
                    </div>
                    <div class="detail-goods-rules">
                        <span>实付款（含运费）</span>
                        <span>￥14.82</span>
                    </div>
                </div>
                <div class="detail-goods-total">
                    合计：<span class="total-num"><span>￥</span>7899</span>
                </div>
            </div>
            <!--订单信息-->
            <div class="detail-msg f-mgb f-bgf">
                <div class="detail-msg-title">订单信息</div>
                <div class="detail-msg-item">
                    <span>订单编号</span>
                    <span>63816468246246264624626</span>
                </div>
                <div class="detail-msg-item">
                    <span>创建时间</span>
                    <span>2017-09-10 14:23:56</span>
                </div>
            </div>
            <!--底部按钮-->
            <div class="detail-bottom f-bgf">
                <div class="detail-bottom-btn">查看物流</div>
                <div class="detail-bottom-btn price">确认收货</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'orderDetail',
    data() {
        return {
            title:'卖家已发货',
            img:require('@/assets/images/icon_kuaidixinxi1@2x.png'),
        }
    },
    created () {
        
    },
    methods: {
        goBack() {
            this.$router.push({
                path:'/order'
            })
        }
    },
}
</script>