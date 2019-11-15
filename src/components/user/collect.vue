<template>
    <div class="collect">
        <!--头部-->
        <nav-bar title="我的收藏" :border=border :leftArrow=leftArrow></nav-bar>
        <!--编辑按钮-->
        <div class="collect-edit" @click="editCollect">编辑</div>
        <!--内容-->
        <div class="collect-content">
            <div class="collect-list f-bgf" v-if="lists&&lists.length>0">
                <div @click.stop="goDetail" class="collect-item f-bdb" v-for="(list,index) in lists" :key="index">
                    <div @click.stop="isCheck(list)" class="icon-checkbox" :class="{'icon-checkbox-active':list.check}" v-show="show"></div>
                    <div class="collect-item-img">
                        <img v-lazy="list.img" alt="">
                    </div>
                    <div class="collect-item-txt">
                        <div class="title">{{list.title}}</div>
                        <div class="specs">{{list.specs}}</div>
                        <div class="btn-box">
                            <div class="price"><span>￥</span>{{list.price}}</div>
                            <div class="cancel-collect-box" @click.stop="cancelCollect">
                                <span class="icon-collect"></span>
                                <span class="cancel-collect">取消收藏</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <no-data v-else text="您还没有添加添加">
                <div class="at-add" @click="atAdd">立即添加</div>
            </no-data>
        </div>
        <!--底部编辑栏-->
        <div class="collect-edit-column f-bgf" v-show="show">
            <div class="edit-column-l" @click.stop="isAllCheck">
                <div class="icon-checkbox" :class="{'icon-checkbox-active':allCheck}"></div>
                <div>全选</div>
            </div>
            <div class="edit-column-r f-bgc1">
                删除
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'collect',
    data() {
        return {
            border:true,
            leftArrow:true,
            lists:[
                {
                    img:require("@/assets/images/icon_wuliuxiaoxi@2x.png"),
                    title:'小米电视4A 70英寸',
                    specs:'黑色',
                    price:3799,
                    check:false,
                },
                {
                    img:require("@/assets/images/icon_wuliuxiaoxi@2x.png"),
                    title:'小米电视4A 70英寸',
                    specs:'黑色11',
                    price:3799,
                    check:false,
                },
            ],
            show:false,//是否显示底部编辑栏
            allCheck:false,//是否全选
        }
    },
    created () {
        
    },
    watch: {
        allCheck:function(val){

        }
    },
    methods: {
        //前往首页
        atAdd(){
            this.$router.push({
                path:'/'
            })
        },
        //查看详情
        goDetail(){
            this.$router.push({
                path:'/goodsContent'
            })
        },
        //编辑
        editCollect(){
            this.show=!this.show;
            if(!this.show){
                this.allCheck=false;
                this.lists.forEach((item,index)=>{
                    item.check=false;
                })
            }
        },
        //是否全选
        isAllCheck(){
            this.allCheck=!this.allCheck;
            if(this.allCheck){
                this.lists.forEach((item,index)=>{
                    item.check=true;
                })
            }else{
                this.lists.forEach((item,index)=>{
                    item.check=false;
                })
            }
        },
        //单个选中
        isCheck(list){
            list.check=!list.check;
            //判断是否全选
            let allcheck=this.lists.every((item,index)=>{
                return item.check==true;
            })
            if(allcheck){
                this.allCheck=true;
            }else{
                this.allCheck=false;
            }
        },
        //取消收藏
        cancelCollect(){
            //this.isShow=true;
            this.$dialog.confirm({
                title:'提示',
                message:'是否取消收藏'
            }).then(()=>{
                console.log('取消了');
            }).catch(()=>{
                console.log('放弃取消')
            })
        },
    },
}
</script>