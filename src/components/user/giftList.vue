<template>
    <div class="order giftList">
        <!--头部-->
        <nav-bar title="预选购礼品" :border=border :leftArrow=leftArrow></nav-bar>
        <!--头部右上角按钮-->
        <!-- <div class="title-right">
            <div class="icon-shopcart" @click="goShopCart"></div>
        </div> -->
        <!--内容-->
        <div class="msg-list">
            <div class="f-bgf msg-list-box f-mgb" v-for="(list,index) in lists" :key="index">
                <div class="order-item f-bdb">
                    <div class="order-item-top">
                        <div class="order-time">
                            {{list.time}}
                        </div>
                        <div class="order-state price">
                            {{list.state}}
                        </div>
                    </div>
                    <div class="order-item-pro" v-for="(order,index) in list.product" :key="index">
                        <div class="order-img">
                            <img v-lazy="order.img" alt="">
                        </div>
                        <div class="order-txt">
                            <div class="order-title">
                                <div class="title">{{order.title}}</div>
                                <div class="num"><span>￥</span>{{order.price}}</div>
                            </div>
                            <div class="order-specs">
                                <div class="specs">{{order.specs}}</div>
                                <div class="num">{{order.num}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="order-item-total">
                        共{{list.sum}}件商品 合计：￥<span>{{list.total}}</span>
                    </div>
                </div>
                <div class="link-msg">
                    <div class="link-msg-item">
                        <span>客户名称：</span>
                        <span>广州市土豪有限公司</span>
                    </div>
                    <div class="link-msg-item">
                        <span>联系人：</span>
                        <span>张先生</span>
                    </div>
                    <div class="link-msg-item">
                        <span>联系电话：</span>
                        <span>19817519956</span>
                    </div>
                    <div class="link-msg-item">
                        <span>申请时间：</span>
                        <span>2019-11-04 18:38:09</span>
                    </div>
                </div>
            </div>
            <van-divider dashed class="botton-line" v-if="lists.length>0">
                没有更多了
            </van-divider>
            <!--暂无数据-->
            <no-data v-if="lists.length<=0"></no-data>
        </div>
    </div>
</template>
<script>
export default {
    name:'giftList',
    data() {
        return {
            border:false,
            leftArrow:true,
            lists:[
                {
                    time:'2017-05-23 22:16:58',
                    state:'已出库',
                    total:7899,
                    sum:2,
                    product:[
                        {
                            title:'小米电视4A 70英寸',
                            specs:'黑色',
                            price:3799,
                            num:1,
                            img:require("@/assets/images/05.png"),
                        },
                        {
                            title:'小米电视4A 70英寸',
                            specs:'黑色',
                            price:3799,
                            num:1,
                            img:require("@/assets/images/05.png"),
                        }
                    ]
                },
                {
                    time:'2017-05-23 22:16:58',
                    state:'已出库',
                    total:7899,
                    sum:2,
                    product:[
                        {
                            title:'小米电视4A 70英寸',
                            specs:'黑色',
                            price:3799,
                            num:1,
                            img:require("@/assets/images/05.png"),
                        },
                        {
                            title:'小米电视4A 70英寸',
                            specs:'黑色',
                            price:3799,
                            num:1,
                            img:require("@/assets/images/05.png"),
                        }
                    ]
                },
                {
                    time:'2017-05-23 22:16:58',
                    state:'已出库',
                    total:7899,
                    sum:2,
                    product:[
                        {
                            title:'小米电视4A 70英寸',
                            specs:'黑色',
                            price:3799,
                            num:1,
                            img:require("@/assets/images/05.png"),
                        },
                        {
                            title:'小米电视4A 70英寸',
                            specs:'黑色',
                            price:3799,
                            num:1,
                            img:require("@/assets/images/05.png"),
                        }
                    ]
                },
            ],
        }
    },
    created () {

    },
    watch: {

    },
    methods: {
        //前往购物车
        goShopCart(){
            this.$router.push({
                path:'/shopCart'
            })
        }
    },
}
</script>