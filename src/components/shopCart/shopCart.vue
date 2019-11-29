<template>
    <div class="shopCart" v-if="showPage">
        <!--头部-->
        <nav-bar
            :title="title"
            :border="border"
            :leftArrow="leftArrow"
        ></nav-bar>
        <!--内容-->
        <div class="cart-content containerView-main" v-if="dataList && dataList.length > 0">
            <div class="cart-list">
                <van-list
                    v-model="loading"
                    :finished="finished"
                    @load="onLoad"
                    :immediate-check="false"
                    :error.sync="error"
                    error-text="请求失败，点击重新加载"
                >
                    <div
                        class="cart-item f-bgf"
                        v-for="(list, index) in dataList"
                        :key="index"
                    >
                        <van-swipe-cell :on-close="onClose" :name="list.cart_guid">
                            <div class="cart-item-con">
                                <div
                                    class="icon-checkbox"
                                    :class="{
                                        'icon-checkbox-active': list.check
                                    }"
                                    @click="inCheckbox(list)"
                                ></div>
                                <div class="item-con-r" @click="goDetail(list.guid)">
                                    <div class="item-con-img">
                                        <img
                                            v-lazy="
                                                $config.api.public_domain +
                                                    list.cover
                                            "
                                            alt
                                        />
                                    </div>
                                    <div class="item-con-txt">
                                        <div class="item-con-title">
                                            {{ list.title }}
                                        </div>
                                        <div class="item-con-specs">
                                            <span>{{
                                                list.sp_value_name
                                            }}</span>
                                        </div>
                                        <div class="price-and-num">
                                            <div class="price">
                                                <span>￥</span>{{list.price|numToFloat}}
                                            </div>
                                            <div class="buy-num">
                                                <span
                                                    class="reduce"
                                                    @click.stop="
                                                        reduceNum(list)
                                                    "
                                                    ></span
                                                >
                                                <input
                                                    type="number"
                                                    @click.stop
                                                    @keyup.stop="computTotal"
                                                    v-model.number="list.num"
                                                />
                                                <span
                                                    class="add"
                                                    @click.stop="addNum(list)"
                                                    ></span
                                                >
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <template slot="right">
                                <van-button square type="danger" text="删除" />
                            </template>
                        </van-swipe-cell>
                    </div>
                </van-list>
                <van-divider
                    dashed
                    class="botton-line"
                    v-if="finished && dataList && dataList.length > 0"
                    >没有更多了</van-divider
                >
            </div>
        </div>
        <!--暂无数据-->
        <no-data v-else></no-data>
        <!--底部结算栏-->
        <div class="settle-box f-bgf" v-if="dataList && dataList.length > 0">
            <div class="all-check" @click.stop="allChecked">
                <div
                    class="icon-checkbox"
                    :class="{ 'icon-checkbox-active': allCheck }"
                ></div>
                <div>全选</div>
            </div>
            <div class="settle-price-btn">
                <div class="settle-price">
                    <span>合计：</span>
                    <span class="price">
                        <span>￥</span>{{ total|numToFloat }}
                    </span>
                </div>
                <div v-if="isStaff" class="settle-btn f-bgc1" @click="goSettle">
                    提交审核
                </div>
                <div v-else class="settle-btn f-bgc1" @click="goSettle">
                    结算
                </div>
            </div>
        </div>
        <!--底部-->
        <primary-bar v-if="isStaff"></primary-bar>
        <tab-bar v-else></tab-bar>
        <!--预选积分-->
        <primary-box :primary=primary v-if="isStaff"></primary-box>
    </div>
</template>
<script>
// import { Dialog,Toast } from 'vant';
export default {
    name: "shopCart",
    data() {
        return {
            title: "购物车",
            leftArrow: false,
            border: false,
            loading: false, //是否触发加载
            finished: false, //数据加载完毕
            error: false, //若列表数据加载失败，将error设置成true即可显示错误提示，用户点击错误提示后会重新触发 load 事件
            page: 1, //页码
            allCheck: false, //是否全选
            dataList: [], //列表内容
            total: 0, //合计价格
            goods: [], //结算商品列表
            isStaff: false, //是否是商务
            primary:0,//预选积分
            showPage:false,//是否显示页面
            delList:[],//删除的商品
        };
    },
    created() {
        if(this.$route.query.token){
            sessionStorage.token=this.$route.query.token;
            this.$router.push({
                path:'/shopCart'
            })
        }
        setTimeout(() => {
            this.init(this.page); //初始化
        }, 50);
    },
    watch: {
        allCheck: function(val) {},
        dataList: function(val) {
            // this.computTotal();//计算价格
            // this.$forceUpdate();//强制渲染
        }
    },
    methods: {
        //初始化获取购物车数据信息
        init(page) {
            this.$axios.post(`/v1/goods/cart?page=${page}&token=${sessionStorage.token}`).then(res => {
                let data = res.data.data;
                if (data.code === 1000) {
                    this.showPage=true;
                    this.isStaff=data.is_primary;
                    if(this.isStaff){
                        this.title='预选清单'
                    }
                    this.primary=data.integral;
                    if (page <= 1) {
                        this.dataList = data.list;
                    } else {
                        this.dataList.push.apply(this.dataList, data.list);
                    }
                    //加载状态结束
                    this.loading = false;
                    //数据全部加载完成
                    if (this.dataList.length == data.totalCount) {
                        this.finished = true;
                    }else{
                        this.finished=false;
                    }
                    this.allCheck = false;
                    this.dataList.forEach((item, index) => {
                        item.check = false;
                    });
                } else {
                    this.error = true;
                }
            });
        },
        // clickPosition 表示关闭时点击的位置
        onClose(clickPosition, instance, detail) {
            this.delList=[];
            switch (clickPosition) {
                case "left":
                case "cell":
                case "outside":
                    instance.close();
                    break;
                case "right":
                    this.$dialog
                        .confirm({
                            message: "确定删除吗？"
                        })
                        .then(() => {
                            this.delList.push(detail.name);
                            this.$axios.post(`/v1/goods/delCart?token=${sessionStorage.token}`,{
                                ids:this.delList
                            }).then((res)=>{
                                let data=res.data.data;
                                if(data.code===1000){
                                    this.$toast({
                                        message:'删除成功',
                                        forbidClick:true
                                    })
                                    setTimeout(() => {
                                        this.page=1;
                                        this.finished=true;
                                        this.loading=false;
                                        this.init(this.page);
                                    }, 1500);
                                }
                            })
                            instance.close();
                        })
                        .catch(() => {
                            instance.close();
                        });
                    break;
            }
        },
        //减少商品数量
        reduceNum(list) {
            list.num = parseInt(list.num);
            if (list.num > 1) {
                list.num -= 1;
            } else {
                list.num = 1;
            }
            this.computTotal(); //计算价格
            //this.$forceUpdate();
        },
        //添加商品数量
        addNum(list) {
            list.num = parseInt(list.num);
            list.num += 1;
            this.computTotal(); //计算价格
            //this.$forceUpdate();
        },
        //选中商品
        inCheckbox(list) {
            list.check = !list.check;
            //判断是否全选
            let allcheck = this.dataList.every((item, index) => {
                return item.check == true;
            });
            if (allcheck) {
                this.allCheck = true;
            } else {
                this.allCheck = false;
            }
            this.computTotal(); //计算价格
            this.$forceUpdate(); //强制渲染
        },
        //结算
        goSettle() {
            //判断产品选择情况
            this.dataList.forEach((item, index) => {
                if (item.check) {
                    let obj = {
                        guid: "",
                        num: ""
                    };
                    obj.guid = item.cart_guid; 
                    obj.num = item.num;
                    this.goods.push(obj);
                }
            });
            //如果咩有选择商品
            if (this.goods.length <= 0) {
                this.$toast("请选择商品");
                return;
            }
            //如果是商务
            if(this.isStaff){
                //提交审核
                this.$axios
                    .post(`/v1/pay/audit?token=${sessionStorage.token}`, {
                        source:'cart',
                        goods: this.goods
                    })
                    .then(res => {
                        let data = res.data.data;
                        if (data.code === 1000) {
                            sessionStorage.beforPath = "shopCart";
                            this.$toast({
                                message:data.msg,
                                forbidClick: true
                            })
                            setTimeout(() => {
                                this.$router.push({
                                    path: "/giftList",
                                });
                            }, 2000);
                        }
                    });
            }else{
                //提交结算，获取buy_id
                this.$axios
                    .post(`/v1/goods/cartPay?token=${sessionStorage.token}`, {
                        goods: this.goods
                    })
                    .then(res => {
                        let data = res.data.data;
                        if (data.code === 1000) {
                            sessionStorage.beforPath = "shopCart";
                            window.location.href =`${this.$config.api.public_english_url}/settle?id=${data.buy_id}&token=${sessionStorage.token}&beforPath=shopCart`;
                            // this.$router.push({
                            //     path: "/settle",
                            //     query: {
                            //         id: data.buy_id
                            //     }
                            // });
                        }
                    });
            }
        },
        //全选
        allChecked() {
            this.allCheck = !this.allCheck;
            this.total = 0;
            if (this.allCheck) {
                this.dataList.forEach((item, index) => {
                    item.check = true;
                    this.total += parseFloat(item.price * item.num);
                });
            } else {
                this.dataList.forEach((item, index) => {
                    item.check = false;
                });
                this.total = 0;
            }
        },
        //计算价格
        computTotal() {
            this.total = 0;
            this.dataList.forEach((item, index) => {
                if (item.check == true) {
                    this.total += parseFloat(item.price * item.num);
                }
            });
        },
        //前往商品详情
        goDetail(id){
            this.$router.push({
                path:'/goodsContent',
                query:{
                    id:id
                }
            })
        },
        //下拉加载更多
        onLoad() {
            if (this.finished === false) {
                this.loading = true;
                setTimeout(() => {
                    if (!this.error) {
                        this.page += 1;
                    }
                    this.init(this.page);
                }, 1500);
            }
        }
    }
};
</script>
