<template>
    <div class="searchResult">
        <div class="search-content">
            <div class="search-top f-bgf">
                <div class="search-top-con">
                    <div class="search-top-back" @click="goBack"></div>
                    <div class="search-top-i">
                        <form action="/" @submit.prevent="onSubmit(1)">
                            <input type="search" 
                            v-on:keyup.native.enter="search"
                            v-model="search_txt"
                            placeholder="搜索礼品名称">
                        </form>
                    </div>
                    <div class="search-top-txt price" @click.stop="onSubmit(1)">搜索</div>
                </div>
                <div class="search-screen">
                    <span class="search-screen-i" @click="priceSort">价格
                        <span class="triangle">
                            <span class="triangle-up" :class="{'triangle-up-active':sort_price&&!isOnce&&sort}"></span>
                            <span class="triangle-down" :class="{'triangle-down-active':sort_price&&!isOnce&&!sort}"></span>
                        </span>
                    </span>
                    <span class="search-screen-i" @click="salesSort">销量
                        <span class="triangle">
                            <span class="triangle-up" :class="{'triangle-up-active':sort_num&&!isOnce&&sort}"></span>
                            <span class="triangle-down" :class="{'triangle-down-active':sort_num&&!isOnce&&!sort}"></span>
                        </span>
                    </span>
                    <span class="search-screen-i" @click="screen">高级筛选</span>
                </div>
            </div>
            <div class="search-list">
                <div class="pro-con-list" v-if="listItem&&listItem.length>0">
                    <van-list
                        v-model="loading"
                        :finished="finished"
                        @load="onLoad"
                        :immediate-check="false"
                        :error.sync="error"
                        error-text="请求失败，点击重新加载"
                    >
                        <div class="list-box">
                            <div @click="goDetail(item)" class="list-item f-bgf" v-for="(item,index) in listItem" :key="index">
                                <div class="item-img">
                                    <img v-lazy="$config.api.public_domain+item.cover" alt="">
                                </div>
                                <div class="item-text">{{item.title}}</div>
                                <div class="item-price">
                                    <span class="price">￥{{item.price}}</span>
                                    <!-- <span class="icon-add-cart"></span> -->
                                </div>
                            </div>
                        </div>
                        <van-divider dashed class="botton-line" v-if="finished && listItem && listItem.length > 0">
                            到底了
                        </van-divider>
                    </van-list>
                </div>
                <div v-else>
                    <no-data></no-data>
                </div>
            </div>
        </div>
        <!--筛选弹窗-->
        <van-popup v-model="show" position="right">
            <div class="popup-box">
                <div class="popup-content">
                    <div class="content-title">价格</div>
                    <div class="screen-price">
                        <input type="number" v-model.number="minPrice" placeholder="最低价">
                        <span class="line"></span>
                        <input type="number" v-model.number="maxPrice" placeholder="最高价">
                    </div>
                </div>
                <div class="popup-btn">
                    <span @click.stop="reset" class="f-bgc3">重置</span>
                    <span @click.stop="define" class="f-bgc1">确定</span>
                </div>
            </div>
        </van-popup>
    </div>
</template>
<script>
import { Toast } from 'vant';
export default {
    name:'searchResult',
    data() {
        return {
            search_txt:this.$store.state.search_txt,
            loading: false, //是否触发加载
            finished: false, //数据加载完毕
            error:false,//若列表数据加载失败，将error设置成true即可显示错误提示，用户点击错误提示后会重新触发 load 事件
            page: 1, //页码
            listItem:[],
            show:false,//是否显示筛选弹层
            minPrice:'',//最低价
            maxPrice:'',//最高价
            sort_price:false,//价格升序排序
            sort_num:false,//销量升序排序
            isOnce:true,//判断是否初次进入页面
            sort:true,//排序规则，true：升序；false：降序
        }
    },
    watch: {
        minPrice:function(oldval,val){
            if(!isNaN(oldval)){
                return oldval;
            }else{
                this.minPrice=val;
            }
        },
        maxPrice:function(oldval,val){
            if(!isNaN(oldval)){
                return oldval;
            }else{
                this.maxPrice=val;
            }
        },
    },
    created () {
        this.onSubmit(this.page);//初始化搜索
    },
    methods: {
        //搜索提交
        onSubmit(page) {
            let name=this.search_txt;//搜索名
            let start_price=this.minPrice;//最低价
            let end_price=this.maxPrice;//最高价
            let sort_price='';//价格排序
            let sort_num='';//销量排序
            //判断是否初次进入
            if(!this.isOnce){//如果不是初次进入
                if(this.sort_price){
                    if(this.sort){//如果是升序
                        sort_price='asc'
                    }else{
                        sort_price='desc'
                    }
                    sort_num='';
                }else if(this.sort_num){
                    if(this.sort){//如果是升序
                        sort_num='asc'
                    }else{
                        sort_num='desc'
                    }
                    sort_price='';
                }
            }
            this.$axios.post(`/v1/goods/list?page=${page}`,{
                name:name,
                sort_price:sort_price,
                sort_num:sort_num,
                start_price:start_price,
                end_price:end_price
            }).then((res)=>{
                let data=res.data.data;
                if (data.code === 1000) {
                    if (page <= 1) {
                        this.listItem = data.list;
                    } else {
                        this.listItem.push.apply(this.listItem, data.list);
                    }
                        //加载状态结束
                    this.loading = false;
                    //数据全部加载完成
                    if (this.listItem.length==data.totalCount) {
                        this.finished = true;
                    }
                }else{
                    this.error=true;
                }
            })
        },
        //返回上一页
        goBack(){
            this.$router.go(-1);
        },
        //价格排序
        priceSort(){
            this.isOnce=false;//是否初次进入页面
            this.sort_price=true;
            this.sort=!this.sort;
            this.sort_num=false;//控制每次筛选只能一个条件
            this.page=1;//重新赋值获取页码
            this.onSubmit(this.page);
        },
        //销量排序
        salesSort(){
            this.isOnce=false;//是否初次进入页面
            this.sort_num=true;
            this.sort=!this.sort;
            this.sort_price=false;//控制每次筛选只能一个条件
            this.page=1;//重新赋值获取页码
            this.onSubmit(this.page);
        },
        //高级筛选
        screen(){
            this.show=true;//显示弹窗
        },
        //重置
        reset(){
            this.minPrice='';
            this.maxPrice='';
            //this.show=false;//隐藏弹窗
            //this.onSubmit(this.page);
        },
        //确定
        define(){
            if(this.maxPrice>0){
                if(this.maxPrice<this.minPrice){
                    Toast('最高价必须大于最低价');
                    return;
                }
            }
            
            //this.finished=false;
            this.show=false;//隐藏弹窗
            this.page=1;//重新赋值获取页码
            this.onSubmit(this.page);
        },
        //前往商品详情
        goDetail(item){
            this.$router.push({
                path: "/goodsContent",
                query:{
                    id:item.guid
                }
            });
        },
        // //加入购物车
        // addCart(item){
        //     console.log(item);
        //     Toast('加入成功');
        // },
        //下拉加载更多
        onLoad() {
            if(this.finished===false){
                this.loading=true;
                setTimeout(() => {
                    if(!this.error){
                        this.page += 1;
                    }
                    this.onSubmit(this.page);
                }, 1500);
            }
        }
    },
}
</script>