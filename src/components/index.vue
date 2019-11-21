<template>
    <div class="index" v-if="showPage">
        <!--内容-->
        <div class="content">
            <!--头部-->
            <div class="content-top">
                <!--搜索-->
                <div class="search-box">
                    <div class="search">
                        <div class="search-bg f-bgf"></div>
                        <form action="/" @submit.prevent="onSubmit">
                            <input
                                type="search"
                                v-on:keyup.native.enter="search"
                                v-model="search_txt"
                                placeholder="搜索礼品名称"
                            />
                        </form>
                        <div class="icon-search" @click.stop="onSubmit"></div>
                    </div>
                    <div class="msg">
                        <img src="../assets/images/icon_xiaoxi_wu@2x.png" alt />
                        <div v-if="hasMsg" class="msg-red"></div>
                    </div>
                </div>
                <!--轮播-->
                <div class="banner">
                    <div class="banner-box">
                        <van-swipe :autoplay="3000">
                            <van-swipe-item
                                v-for="(image, index) in images"
                                :key="index"
                                @click="goUrl(image)"
                            >
                                <lazy-component>
                                    <img v-lazy="$config.api.public_domain+image.image" />
                                </lazy-component>
                            </van-swipe-item>
                        </van-swipe>
                    </div>
                </div>
            </div>
            <!--产品内容-->
            <div class="pro-content">
                <div class="pro-title">
                    <img v-lazy="proTitle" alt />
                </div>
                <div class="pro-content-box">
                    <div class="pro-title-list">
                        <van-tabs swipeable @change="changePro" animated sticky>
                            <van-tab
                                v-for="bar in navBar"
                                :title="bar.title"
                                :key="bar.id"
                            >
                                <div class="pro-con-list">
                                    <van-list
                                        v-model="loading"
                                        :finished="finished"
                                        @load="onLoad"
                                        :immediate-check="false"
                                        :error.sync="error"
                                        error-text="请求失败，点击重新加载"
                                    >
                                        <div
                                            class="list-box"
                                            v-if="
                                                listItem && listItem.length > 0
                                            "
                                        >
                                            <div
                                                @click="goDetail(item)"
                                                class="list-item f-bgf"
                                                v-for="item in listItem"
                                                :key="item.id"
                                            >
                                                <div class="item-img">
                                                    <img
                                                        v-lazy="
                                                            $config.api
                                                                .public_domain +
                                                                item.cover
                                                        "
                                                        alt
                                                    />
                                                </div>
                                                <div class="item-text">
                                                    {{ item.title }}
                                                </div>
                                                <div class="item-price">
                                                    <span class="price"
                                                        >￥{{
                                                            item.price
                                                        }}</span
                                                    >
                                                    <!-- <span class="icon-add-cart"></span> -->
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            class="no-data-box"
                                            v-if="listItem.length <= 0"
                                        >
                                            <no-data></no-data>
                                        </div>
                                        <van-divider
                                            dashed
                                            class="botton-line"
                                            v-if="
                                                finished &&
                                                    listItem &&
                                                    listItem.length > 0
                                            "
                                            >到底了</van-divider
                                        >
                                    </van-list>
                                </div>
                            </van-tab>
                        </van-tabs>
                    </div>
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
import { clearSession } from "@/utils/index";
export default {
    data() {
        return {
            border: false,
            search_txt: "", //搜索内容
            images: [],//轮播图片
            proTitle: require("@/assets/images/youxuanlipin@2x.png"),
            loading: false, //是否触发加载
            finished: false, //数据加载完毕
            error: false, //若列表数据加载失败，将error设置成true即可显示错误提示，用户点击错误提示后会重新触发 load 事件
            page: 1, //页码
            proId: 0, //默认获取精品推荐列表内容
            listItem: [], //数据内容
            navBar: [
                {
                    id: 0,
                    title: "精品推荐"
                }
            ], //导航内容
            hasMsg: false, //是否有未读消息
            isStaff: false, //是否是商务
            primary:0,//预选积分
            showPage:false,//页面显示
        };
    },
    created() {
        clearSession(); //清除会话内容
        this.init(this.page); //初始化
        //this.getCategory(); //获取分类
        this.getMsg(); //获取分类、未读消息、预选积分
    },
    mounted() {
        //禁用浏览器返回
        (function() {
            if (window.history && window.history.pushState) {
                window.onpopstate = function() {
                    window.history.pushState("forward", null, "");
                    window.history.forward(1);
                };
            }
            window.history.pushState("forward", null, ""); //在IE中必须得有这两行
            window.history.forward(1);
        })();
    },
    methods: {
        //初始化获取数据
        init(page) {
            this.$axios
                .post(`v1/goods/list?page=${page}`, {
                    category_id: this.proId //分类id
                })
                .then(res => {
                    let data = res.data.data;
                    if (data.code === 1000) {
                        if (page <= 1) {
                            this.listItem = data.list;
                        } else {
                            this.listItem.push.apply(this.listItem, data.list);
                        }
                        //加载状态结束
                        this.loading = false;
                        //数据全部加载完成
                        if (this.listItem.length == data.totalCount) {
                            this.finished = true;
                        }
                        this.showPage=true;
                    } else {
                        this.error = true;
                    }
                });
        },
        //获取商品分类
        // async getCategory() {
        //     this.$axios.post("/v1/goods/category").then(res => {
        //         let data = res.data.data;
        //         if (data.code === 1000) {
        //             this.navBar.push.apply(this.navBar, data.category_array);
        //         }
        //     });
        // },
        //查询是否有未读消息、商品分类、预选积分
        async getMsg() {
            if (sessionStorage.token) {
                this.$axios.post("/v1/home/dataInfo").then(res => {
                    let data = res.data.data;
                    if (data.code === 1000) {
                        this.navBar.push.apply(this.navBar, data.category_array);//商品分类
                        this.hasMsg = data.unread_msg;//是否有未读信息
                        this.isStaff=data.is_primary;//是否是商务
                        this.primary=data.integral;//预选积分
                        this.images=data.ad;//轮播
                    }
                });
            }
        },
        search() {},
        //搜索
        onSubmit() {
            this.$Store.commit("searchTxt", this.search_txt);
            this.$router.push({
                path: "/searchResult"
            });
        },
        //轮播图跳转链接
        goUrl(item){
            if(item.url){
                window.location.href=item.url;
            }
        },
        //切换标签栏
        changePro(name, title) {
            //根据title获取点击的id
            for (let i = 0; i < this.navBar.length; i++) {
                if (this.navBar[i].title == title) {
                    this.proId = this.navBar[i].id;
                }
            }
            this.page = 1; //重新赋值获取页码
            this.init(this.page);
        },
        //前往商品详情
        goDetail(item) {
            this.$router.push({
                path: "/goodsContent",
                query: {
                    id: item.guid
                }
            });
        },
        //加入购物车
        // addCart(item) {
        //   this.$toast("加入成功");
        // },
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
}
</script>
