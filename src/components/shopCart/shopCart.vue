<template>
    <div class="shopCart">
        <!--头部-->
        <nav-bar title="购物车" :border=border :leftArrow=leftArrow></nav-bar>
        <!--内容-->
        <div class="cart-content" v-if="dataList&&dataList.length>0">
            <div class="cart-list f-bgf">
                <div class="cart-item" v-for="(list,index) in dataList" :key="index">
                    <van-swipe-cell :on-close="onClose" :name=index>
                        <div class="cart-item-con">
                            <div class="icon-checkbox" :class="{'icon-checkbox-active':list.check}" @click="inCheckbox(list)"></div>
                            <div class="item-con-r">
                                <div class="item-con-img">
                                    <img v-lazy="list.img" alt="">
                                </div>
                                <div class="item-con-txt">
                                    <div class="item-con-title">{{list.title}}</div>
                                    <div class="item-con-specs">
                                        <span v-for="(item,index) in list.specs" :key="index">{{item.name}}</span>
                                    </div>
                                    <div class="price-and-num">
                                        <div class="price"><span>￥</span>{{list.price}}</div>
                                        <div class="buy-num">
                                            <span class="reduce" @click.stop="reduceNum(list)">-</span>
                                            <input type="number" v-model.number="list.num">
                                            <span class="add" @click.stop="addNum(list)">+</span>
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
            </div>
        </div>
        <!--暂无数据-->
        <no-data v-else></no-data>
        <!--底部结算栏-->
        <div class="settle-box f-bgf">
            <div class="all-check" @click.stop="allChecked">
                <div class="icon-checkbox" :class="{'icon-checkbox-active':allCheck}"></div>  
                <div>全选</div>
            </div>
            <div class="settle-price-btn">
                <div class="settle-price">
                    <span>合计：</span>
                    <span class="price">
                        <span>￥</span>3799
                    </span>
                </div>
                <div class="settle-btn f-bgc1" @click="goSettle">
                    结算
                </div>
            </div>
        </div>
        <!--底部导航-->
        <tab-bar></tab-bar>
        <!-- <primary-bar></primary-bar> -->
    </div>
</template>
<script>
import { Dialog,Toast } from 'vant';
export default {
    data(){
        return{
            leftArrow:false,
            border:false,
            allCheck:false,//是否全选
            dataList:[
                {
                    title:'小米电视4A 70英寸',
                    img:require("@/assets/images/05.png"),
                    specs:[
                        {name:'黑色'},
                        {name:'大码'}
                    ],
                    price:'3789',
                    num:1,
                    check:false,
                },
                {
                    title:'小米电视4A 70英寸',
                    img:require("@/assets/images/05.png"),
                    specs:[
                        {name:'白色'},
                        {name:'大码'}
                    ],
                    price:'3789',
                    num:2,
                    check:false,
                }
            ]
        }
    },
    created() {
        
    },
    methods: {
        // clickPosition 表示关闭时点击的位置
        onClose(clickPosition, instance,detail) {
            switch (clickPosition) {
                case 'left':
                case 'cell':
                case 'outside':
                instance.close();
                break;
                case 'right':
                Dialog.confirm({
                    message: '确定删除吗？'
                }).then(() => {
                    console.log(detail);
                    instance.close();
                }).catch(()=>{
                    instance.close();
                });
                break;
            }
        },
        //减少商品数量
        reduceNum(list){
            if(list.num>1){
                list.num-=1;
            }else{
                list.num=1;
            }
        },
        //添加商品数量
        addNum(list){
            list.num+=1;
        },
        //选中商品
        inCheckbox(list){
            if(list.check){
                list.check=false;
            }else{
                list.check=true;
            }
        },
        //结算
        goSettle(){
            this.$router.push({
                path:'/settle'
            })
        },
        //全选
        allChecked(){
            this.allCheck=!this.allCheck;
        }
    },
}
</script>