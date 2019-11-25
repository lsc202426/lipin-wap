<template>
    <div class="index">
        <!--内容-->
        <div class="content containerView-main">
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
                    <div class="msg" @click.stop="goNews">
                        <img :src="msgBg" alt />
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
                <!--产品类别列表-->
                <div class="pro-type-list">
                    <div class="pro-type-item" @click.stop="onSubmit(item.id)" v-for="(item,index) in typeList" :key="index">
                        <div class="item-img">
                            <img v-lazy="$config.api.public_domain + item.logo" alt="">
                        </div>
                        <div class="item-text">{{item.title}}</div>
                    </div>
                </div>
                <!--产品块-->
                <div class="pro-block-list">
                    <div class="pro-block-item f-bgf" v-for="(list,index) in proBlock" :key="index">
                        <div class="title">{{list.name}}</div>
                        <div class="item-banner" @click.stop="goUrl(list)">
                            <img v-lazy="$config.api.public_domain +list.image" alt="">
                        </div>
                        <div class="item-pro-list">
                            <div class="pro-item-inblock" :class="{'f-bdt':index>2}" @click.stop="goDetail(item)" v-for="(item,index) in list.goods" :key="index">
                                <div class="inblock-img">
                                    <img v-lazy="$config.api.public_domain +item.cover" alt="">
                                </div>
                                <div class="inblock-title">
                                    {{item.title}}
                                </div>
                                <div class="price">￥{{item.price}}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--猜你喜欢-->
                <div class="guess-you-like" v-if="listItem&&listItem.length > 0">
                    <div class="title">猜你喜欢</div>
                    <div class="pro-title-list">
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
                                        @click.stop="goDetail(item)"
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
                                                ><span>￥</span>{{
                                                    item.price
                                                }}</span
                                            >
                                            <!-- <span class="icon-add-cart"></span> -->
                                        </div>
                                    </div>
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
            msgBg:require("@/assets/images/icon_xiaoxi_wu@2x.png"),
            loading: false, //是否触发加载
            finished: false, //数据加载完毕
            error: false, //若列表数据加载失败，将error设置成true即可显示错误提示，用户点击错误提示后会重新触发 load 事件
            page: 1, //页码
            hasMsg: false, //是否有未读消息
            isStaff: false, //是否是商务
            primary:0,//预选积分
            showPage:false,//页面显示
            listItem:[],//猜你喜欢
            typeList:[],//商品类别
            proBlock:[],//推荐商品
        };
    },
    created() {
        clearSession(); //清除会话内容
        this.getMsg(); //获取分类、未读消息、预选积分
        this.init(this.page); //初始化
        //this.getCategory(); //获取分类
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
        async init(page) {
            this.$axios
                .post(`v1/goods/list?page=${page}&token=${sessionStorage.token}`).then(res => {
                    let data = res.data.data;
                    if (data.code === 1000) {
                        //this.showPage=true;
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
                        }else{
                            this.finished = false;
                        }
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
        getMsg() {
            this.$axios.post(`/v1/home/dataInfo?token=${sessionStorage.token}`).then(res => {
                let data = res.data.data;
                if (data.code === 1000) {
                    this.hasMsg = data.unread_msg;//是否有未读信息
                    this.isStaff=data.is_primary;//是否是商务
                    this.primary=data.integral;//预选积分
                    this.images=data.ad;//轮播
                    this.typeList=data.category_array;//商品类别
                    this.proBlock=data.recommend;//推荐商品
                }
            });
        },
        search() {},
        //搜索
        onSubmit(id) {
            this.$Store.commit("searchTxt", this.search_txt);
            if(id){
                this.$Store.commit("searchId", id);
            }
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
        //前往商品详情
        goDetail(item) {
            this.$router.push({
                path: "/goodsContent",
                query: {
                    id: item.guid
                }
            });
        },
        //前往消息页面
        goNews(){
            sessionStorage.beforPath='/';
            this.$router.push({
                path:'/news'
            })
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
