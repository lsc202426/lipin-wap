<template>
    <div class="goodsContent">
        <div class="goods-page containerView-main">
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
                            <div class="parameter-text f-bgf" @click="showLayer" v-if="spec.value&&spec.value.length>0">
                                <span class="change-tip">选择参数</span>
                                <div class="parameter-con">
                                    <span v-show="spec_txt">{{spec_txt}} x {{num}}</span>
                                </div>
                            </div>
                            <div class="parameter-box parameter-box-n f-bgf" v-else>
                                <div class="buy-box f-bgf">
                                    <div>购买数量</div>
                                    <div class="buy-num">
                                        <span class="reduce" @click="reduceNum">-</span>
                                        <input type="number" v-model.number="num">
                                        <span class="add" @click="addNum">+</span>
                                    </div>
                                </div>
                            </div>
                            <van-action-sheet v-model="show" title=" ">
                                <div class="parameter-box">
                                    <div class="parameter-item f-bdb">
                                        <div class="parameter-title">{{spec.sp_name}}</div>
                                        <div class="parameter-detail">
                                            <span @click="changePar(item,index,)" :class="{'active':spec.default==index}" v-for="(item,index) in spec.value" :key="item.id">{{item.sp_value_name}}</span>
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
                                    <div class="goods-btn-box">
                                        <div @click.stop="define" v-if="showType==0" class="f-bgc1">确定</div>
                                        <div @click.stop="addCart" v-if="showType==1" class="f-bgc2">{{addCartTxt}}</div>
                                        <div @click.stop="orderNow" v-if="showType==2" class="f-bgc1">{{orderNowTxt}}</div>
                                    </div>
                                </div>
                            </van-action-sheet>
                        </div>
                        <van-goods-action>
                            <van-goods-action-icon @click="inStar" v-if="isCollection" icon="star" text="已收藏" />
                            <van-goods-action-icon @click="inStar" v-else icon="star-o" text="收藏" />
                            <van-goods-action-button @click.stop="addCart" color="#FF9234" type="warning" :text=addCartTxt />
                            <van-goods-action-button @click.stop="orderNow" color="#F38219" type="danger" :text=orderNowTxt />
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
            spec:{},//参数内容
            spec_id:'',//规格值id
            spec_txt:'',//规格值名字
            showType:0,
            addCartTxt:'加入购物车',
            orderNowTxt:'立即购买',
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
                        this.data=data.info;
                        this.data.spec.default=-1;
                        if(this.data.collect_id&&this.data.collect_id!=''){
                            this.isCollection=true;
                        }
                        if(this.data.spec){
                            this.spec=this.data.spec;
                        }
                        //如果只有一个规格参数，默认选中
                        if(this.spec.value&&this.spec.value.length==1){
                            this.spec.default=0;
                            this.spec_id=this.spec.value[0].id;//规格值id
                            this.spec_txt=this.spec.value[0].sp_value_name;//规格值名字
                        }
                        //如果是商务，改变按钮名称
                        if(this.data.is_primary){
                            this.addCartTxt='加入预选清单';
                            this.orderNowTxt='提交审核';
                        }
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
            //console.log(name,title);
        },
        //弹出参数选择框
        showLayer(){
            this.showType=0;
            this.show=true;
        },
        //修改商品参数
        changePar(item,i){
            this.spec.default=i;
            this.spec_id=item.id;//规格值id
            this.spec_txt=item.sp_value_name;//规格值名字
            this.$forceUpdate();
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
            let id=this.$route.query.id;
            if(this.isCollection){
                this.$axios.post('/v1/home/addCollect',{
                    goods_guid:id
                }).then((res)=>{
                    let data=res.data.data;
                    if(data.code===1000){
                        this.$toast({
                            message:'已收藏',
                            forbidClick: true
                        });
                        setTimeout(() => {
                            this.init();
                        }, 2000);
                    }
                })
            }else{
                let ids=[];
                ids.push(this.data.collect_id);
                this.$axios.post('/v1/home/delCollect',{
                    ids:ids
                }).then((res)=>{
                    let data=res.data.data;
                    if(data.code===1000){
                        this.$toast({
                            message:'取消收藏',
                            forbidClick: true
                        });
                        setTimeout(() => {
                            this.init();
                        }, 2000);
                    }
                })
            }
        },
        //加入购物车
        addCart(){
            this.showType=1;
            if(this.spec.value&&this.spec.value.length>0){
                if(!this.spec_txt){
                    if(this.show){
                        this.$toast('请选择参数');
                    }
                    this.show=true;
                }else{
                    this.addCartSub();
                }
            }else{
                this.addCartSub();
            }
        },
        //加入购物车提交
        addCartSub(){
            this.$axios.post('/v1/goods/addCart',{
                    goods_guid:this.$route.query.id,
                    num:this.num,
                    spec_id:this.spec_id
                }).then((res)=>{
                    let data=res.data.data;
                    if(data.code===1000){
                        this.show=false;
                        this.$toast({
                            message:'加入成功',
                            forbidClick:true
                        });
                    }
                })
        },
        //立即购买
        orderNow(){
            this.showType=2;
            if(this.spec.value&&this.spec.value.length>0){
                if(!this.spec_txt){
                    if(this.show){
                        this.$toast('请选择参数');
                    }
                    this.show=true;
                }else{
                    this.orderNowSub();
                }
            }else{
                this.orderNowSub();
            }
        },
        //立即购买提交
        orderNowSub(){
            //判断是否商务提交
            if(this.data.is_primary){
                let goods=[
                    {
                        guid:this.$route.query.id,
                        spec_id:this.spec_id,
                        num:this.num
                    }
                ]
                this.$axios.post('/v1/pay/audit',{
                    source:'buy',
                    goods:goods
                }).then((res)=>{
                    let data=res.data.data;
                    if(data.code===1000){
                        sessionStorage.beforPath='goodsContent';
                        this.$toast({
                            message:data.msg,
                            forbidClick: true
                        })
                        setTimeout(() => {
                            this.$router.push({
                                path:'/giftList'
                            })
                        }, 2000);
                    }
                })
            }else{
                this.$axios.post('/v1/goods/buy',{
                    goods_guid:this.$route.query.id,
                    num:this.num,
                    spec_id:this.spec_id
                }).then((res)=>{
                    let data=res.data.data;
                    if(data.code===1000){
                        sessionStorage.beforPath='goodsContent';
                        this.$router.push({
                            path:'/settle',
                            query:{
                                id:data.buy_id
                            }
                        })
                    }
                })
            }
            
        },
        //确定，隐藏弹出框
        define(){
            if(!this.spec_txt){
                if(this.show){
                    this.$toast('请选择参数');
                }
                this.show=true;
            }else{
                this.show=false;
            }
        }
    },
}
</script>