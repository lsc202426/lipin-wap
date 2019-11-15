<template>
    <div class="goodsContent">
        <div class="goods-page">
            <van-tabs @click="changeList">
                <div class="goods-back" @click.stop="goBack"></div>
                <van-tab title="商品">
                    <!--轮播图内容-->
                    <div class="goods-banner">
                        <van-swipe :autoplay="3000">
                            <van-swipe-item v-for="(image, index) in data.carousel" :key="index">
                                <img v-lazy="$config.api.public_domain+image" />
                            </van-swipe-item>
                        </van-swipe>
                    </div>
                    <!--内容部分-->
                    <div class="goods-content">
                        <div class="content-box f-bgf">
                            <div class="content-title">{{data.title}}</div>
                            <div class="content-text">{{data.describe}}</div>
                            <div class="content-price price">
                                <span class="sign">￥</span>
                                <span>{{data.price}}</span>
                            </div>
                        </div>
                        <div class="goods-parameter">
                            <div class="parameter-text f-bgf" @click="showLayer">
                                <span class="change-tip">选择参数</span>
                                <div class="parameter-con">
                                    小米电视 4k 55英寸 银灰色 55英寸 x 1
                                </div>
                            </div>
                            <van-action-sheet v-model="show" title=" ">
                                <div class="parameter-box">
                                    <div class="parameter-item f-bdb" v-for="(list,index) in lists" :key="index">
                                        <div class="parameter-title">{{list.title}}</div>
                                        <div class="parameter-detail">
                                            <span @click="changePar(list,index)" :class="{active:list.default==index}" v-for="(item,index) in list.type" :key="index">{{item.name}}</span>
                                        </div>
                                    </div>
                                    <div class="buy-box f-bdb">
                                        <div>购买数量</div>
                                        <div class="buy-num">
                                            <span class="reduce" @click="reduceNum">-</span>
                                            <input type="number" v-model.number="num">
                                            <span class="add" @click="addNum">+</span>
                                        </div>
                                    </div>
                                    <div @click="addCart" class="add-cart-btn f-bgc1">加入购物车</div>
                                </div>
                            </van-action-sheet>
                        </div>
                        <van-goods-action>
                            <van-goods-action-icon @click="inStar" v-if="isCollection" icon="star" text="已收藏" />
                            <van-goods-action-icon @click="inStar" v-else icon="star-o" text="收藏" />
                            <van-goods-action-button @click.stop="addCart" color="#FF9234" type="warning" text="加入购物车" />
                            <van-goods-action-button @click.stop="orderNow" color="#F38219" type="danger" text="立即购买" />
                        </van-goods-action>
                    </div>
                </van-tab>
                <van-tab title="详情">
                    <div class="goods-detail">
                        <div v-html="data.memo"></div>
                    </div>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>
<script>
export default {
    name:'goodsContent',
    data(){
        return{
            show:false,//是否显示参数选择框
            num:1,//加入购物车数量
            isCollection:false,//是否收藏
            data:{},//获取的数据信息
            lists:[//供选择参数列表
                {
                    title:'颜色',
                    default:0,
                    type:[
                        {
                            name:'黑色',
                        },
                        {
                            name:'银辉色'
                        }
                    ]
                },
                {
                    title:'大小',
                    default:1,
                    type:[
                        {
                            name:'大码'
                        },
                        {
                            name:'细小码'
                        }
                    ]
                },
            ]
        }
    },
    watch: {
        num:function(oldval,val){
            this.num=Math.floor(oldval);
            if(!isNaN(oldval)&& typeof oldval === 'number'){
                return oldval;
            }else{
                this.num=val;
            }
        }
    },
    created () {
        //初始化获取商品数据
        this.init();
    },
    methods: {
        init() {
            if(this.$route.query.id){
                let id=this.$route.query.id;
                this.$axios.post('/v1/goods/detail',{
                    guid:id
                }).then((res)=>{
                    let data=res.data.data;
                    if(data.code===1000){
                        console.log(data);
                        this.data=data.info;
                    }
                })
            }else{
                //如果没有传id，返回首页去
                this.$router.push({
                    path:'/'
                })
            }
        },
        //返回上一页
        goBack(){
            this.$router.go(-1);
        },
        //商品详情切换
        changeList(name,title){
            console.log(name,title);
        },
        //弹出参数选择框
        showLayer(){
            this.show=true;
        },
        //修改商品参数
        changePar(list,i){
            list.default=i;
        },
        //减少商品数量
        reduceNum(){
            if(this.num>1){
                this.num--;
            }else{
                this.num=1;
            }
        },
        //添加商品数量
        addNum(){
            this.num++;
        },
        //收藏
        inStar(){
            this.isCollection=!this.isCollection;
            if(this.isCollection){
                this.$toast('已收藏');
            }else{
                this.$toast('取消收藏');
            }
        },
        //加入购物车
        addCart(){
            this.show=false;
            this.$toast('加入成功');
        },
        //立即购买
        orderNow(){
            this.$router.push({
                path:'/settle'
            })
        }
    },
}
</script>