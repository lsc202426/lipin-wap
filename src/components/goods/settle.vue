<template>
    <div class="settle">
        <div class="settle-content">
            <!--头部内容-->
            <div class="settle-top">
                <div class="settle-title">
                    <span class="go-back" @click.stop="goBack"></span>
                    <div class="title">订单结算</div>
                </div>
                <div class="address-msg" @click="goAddress">
                    <div class="msg-name">
                        <span>名字</span>
                        <span>13800138000</span>
                    </div>
                    <div class="address-text">
                        广州市 海珠区 滨江街道 怡乐路奇乐园21号302
                    </div>
                    <!-- <div class="address-code">510000</div> -->
                </div>
            </div>
            <!--内容部分-->
            <div class="settle-con-box">
                <div class="goods-msg f-bgf f-mgb">
                    <div class="goods-item f-bdb">
                        <div class="goods-item-con">
                            <div class="goods-img">
                                <img :src="img" alt="">
                            </div>
                            <div class="goods-txt">
                                <div class="goods-title">
                                    <div class="title">小米电视4A 70英寸</div>
                                    <div class="num">x1</div>
                                </div>
                                <div class="goods-price price">
                                    <span>￥</span>3799
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="goods-tab f-bdb">
                        <div>商品价格：</div>
                        <div class="price">
                            <span>￥</span>3799
                        </div>
                    </div>
                    <div class="goods-tab">
                        <div>配送费用：</div>
                        <div>包邮</div>
                    </div>
                </div>
                <!--备注-->
                <div class="goods-tab goods-tab-i f-mgb f-bgf">
                    <div>备注：</div>
                    <input type="text" placeholder="请填写订单备注">
                </div>
                <!--可用积分与需支付金额-->
                <div class="goods-tab f-bdb f-bgf">
                    <div>可用积分：</div>
                    <div class="integral">
                        <span>{{integral}}（1积分=1元）</span>
                        <span @click="changeIntCheck" class="icon-checkbox" :class="{'icon-checkbox-active':isIntegral}"></span>
                    </div>
                </div>
                <div class="goods-tab f-bgf f-mgb">
                    <div>仍需支付：</div>
                    <div class="price">
                        <span>￥</span>{{needToPay}}
                    </div>
                </div>
                <!--支付方式-->
                <div class="pay-mode f-mgb" v-if="needToPay>0">
                    <div class="title">请选择支付方式</div>
                    <div class="goods-tab f-bdb f-bgf" @click.stop="checkPayType(0)">
                        <div class="pay-item">
                            <div class="img-box">
                                <img v-lazy="imgWx" class="imgWx" alt="">
                            </div>
                            <span>微信支付</span>
                        </div>
                        <div class="icon-checkbox" :class="{'icon-checkbox-active':payType==0}"></div>
                    </div>
                    <div class="goods-tab f-bdb f-bgf" @click.stop="checkPayType(1)">
                        <div class="pay-item">
                            <div class="img-box">
                                <img v-lazy="imgZfbx" class="imgZfb" alt="">
                            </div>
                            <span>支付宝支付</span>
                        </div>
                        <div class="icon-checkbox" :class="{'icon-checkbox-active':payType==1}"></div>
                    </div>
                    <div class="goods-tab f-bdb f-bgf" @click.stop="checkPayType(2)">
                        <div class="pay-item">
                            <div class="img-box">
                                <img v-lazy="imgYl" class="imgYl" alt="">
                            </div>
                            <span>银联支付</span>
                        </div>
                        <div class="icon-checkbox" :class="{'icon-checkbox-active':payType==2}"></div>
                    </div>
                </div>
            </div>
            <!--底部栏目-->
            <div class="settle-bottom f-bgf">
                <div class="settle-bottom-text">
                    <span>共2件，应付金额：</span>
                    <span class="price">
                        <span>￥</span>7398
                    </span>
                </div>
                <div class="payment-btn f-bgc1">去付款</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'settle',
    data() {
        return {
            img:require("@/assets/images/05.png"),//商品图片
            imgWx:require("@/assets/images/icon_weixin@2x.png"),//商品图片
            imgZfbx:require("@/assets/images/icon_zhifubao@2x.png"),//商品图片
            imgYl:require("@/assets/images/icon_yinlian@2x.png"),//商品图片
            total:7399,//支付总额
            integral:4000,//可用积分
            isIntegral:true,//是否使用积分
            needToPay:0,//需支付总额
            payType:0,//默认选中支付方式，0：微信；1：支付宝；2：银联
        }
    },
    created () {
        this.computedTotal();
    },
    methods: {
        //计算需支付金额
        computedTotal(){
            //计算需支付总额
            if(this.total<=this.integral){
                this.needToPay=0;
            }else{
                this.needToPay=this.total-this.integral;
            }
        },
        //返回上一页
        goBack() {
            this.$router.go(-1);
        },
        //前往选择地址
        goAddress(){
            this.$router.push({
                path:'/myAddress'
            })
        },
        //是否使用积分
        changeIntCheck(){
            this.isIntegral=!this.isIntegral;
            if(this.isIntegral){
                this.computedTotal();
            }else{
                this.needToPay=this.total;
            }
        },
        //选择支付方式
        checkPayType(i){
            this.payType=i;
        }
    },
}
</script>