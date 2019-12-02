<template>
    <div class="collect">
        <!--头部-->
        <nav-bar title="我的收藏" url="/user" :border=border :leftArrow=leftArrow></nav-bar>
        <!--编辑按钮-->
        <div class="collect-edit" @click="editCollect">{{editTxt}}</div>
        <!--内容-->
        <div class="collect-content containerView-main">
            <van-list
                v-model="loading"
                :finished="finished"
                @load="onLoad"
                :immediate-check="false"
                :error.sync="error"
                error-text="请求失败，点击重新加载"
            >
                <div class="collect-list f-bgf" v-if="lists&&lists.length>0">
                    <div @click.stop="goDetail(list.goods_id)" class="collect-item f-bdb" v-for="(list,index) in lists" :key="index">
                        <div @click.stop="isCheck(list)" class="icon-checkbox" :class="{'icon-checkbox-active':list.check}" v-show="show"></div>
                        <div class="collect-item-img">
                            <img v-lazy="$config.api.public_domain + list.cover" alt="">
                        </div>
                        <div class="collect-item-txt">
                            <div class="title">{{list.title}}</div>
                            <!-- <div class="specs">{{list.specs}}</div> -->
                            <div class="btn-box">
                                <div class="price"><span>￥</span>{{list.price}}</div>
                                <div class="cancel-collect-box" @click.stop="cancelCollect(list.id)">
                                    <span class="icon-collect"></span>
                                    <span class="cancel-collect">取消收藏</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <no-data v-else text="您还没有添加商品">
                    <div class="at-add" @click="atAdd">立即添加</div>
                </no-data>
            </van-list>
        </div>
        <!--底部编辑栏-->
        <div class="collect-edit-column f-bgf" v-show="show">
            <div class="edit-column-l" @click.stop="isAllCheck">
                <div class="icon-checkbox" :class="{'icon-checkbox-active':allCheck}"></div>
                <div>全选</div>
            </div>
            <div class="edit-column-r f-bgc1" @click="deletePro">
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
            loading: false, //是否触发加载
            finished: false, //数据加载完毕
            error:false,//若列表数据加载失败，将error设置成true即可显示错误提示，用户点击错误提示后会重新触发 load 事件
            page: 1, //页码
            lists:[],
            show:false,//是否显示底部编辑栏
            allCheck:false,//是否全选
            editTxt:'编辑',
        }
    },
    created () {
        this.init(this.page);//初始化
    },
    watch: {
        allCheck:function(val){

        },
        lists:function(val){
            if(val.length<=0){
                this.show=false;
                this.editTxt='编辑';
            }
        },
        show:function(val){
            if(val){
                this.editTxt='取消';
            }else{
                this.editTxt='编辑';
            }
        }
    },
    methods: {
        //初始化获取收藏列表
        init(page){
            this.$axios.post(`/v1/home/collectList?page=${page}&token=${sessionStorage.token}`).then(res => {
                let data = res.data.data;
                if (data.code === 1000) {
                    if (page <= 1) {
                        this.lists = data.list;
                    } else {
                        this.lists.push.apply(this.lists, data.list);
                    }
                    //加载状态结束
                    this.loading = false;
                    //数据全部加载完成
                    if (this.lists.length==data.totalCount) {
                        this.finished = true;
                    }else{
                        this.finished=false;
                    }
                    this.lists.forEach((item, index) => {
                        item.check = false;
                    });
                }else{
                    this.error=true;
                }
            });
        },
        //前往首页
        atAdd(){
            this.$router.push({
                path:'/'
            })
        },
        //查看详情
        goDetail(id){
            this.$router.push({
                path:'/goodsContent',
                query:{
                    id:id
                }
            })
        },
        //编辑
        editCollect(){
            if(this.lists.length>0){
                this.show=!this.show;
                if(!this.show){
                    this.allCheck=false;
                    this.lists.forEach((item,index)=>{
                        item.check=false;
                    })
                }
            }
        },
        //是否全选
        isAllCheck(){
            this.allCheck=!this.allCheck;
            this.deleteList=[];//清空
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
            this.$forceUpdate();
        },
        //取消收藏
        cancelCollect(id){
            this.$dialog.confirm({
                title:'提示',
                message:'是否取消收藏'
            }).then(()=>{
                let ids=[];
                ids.push(id);
                this.$axios.post(`/v1/home/delCollect?token=${sessionStorage.token}`,{
                    ids:ids
                }).then((res)=>{
                    let data=res.data.data;
                    if(data.code===1000){
                        this.$toast({
                            message:'已取消收藏',
                            forbidClick: true
                        });
                        setTimeout(() => {
                            this.page=1;//重新赋值获取页码
                            this.finished=true;
                            this.loading = false;
                            this.init(this.page);
                        }, 2000);
                    }
                })
            }).catch(()=>{
                //console.log('放弃取消')
            })
        },
        //删除
        deletePro(){
            let ids=[];
            this.lists.forEach((item,index)=>{
                if(item.check){
                    ids.push(item.id);
                }
            })
            if(ids.length<=0){
                this.$toast('请选择要删除的商品');
                return;
            }
            this.$dialog.confirm({
                title:'提示',
                message:'是否删除'
            }).then(()=>{
                this.$axios.post(`/v1/home/delCollect?token=${sessionStorage.token}`,{
                    ids:ids
                }).then((res)=>{
                    let data=res.data.data;
                    if(data.code===1000){
                        this.$toast({
                            message:'删除成功',
                            forbidClick: true
                        });
                        setTimeout(() => {
                            this.show=false;
                            this.page=1;//重新赋值获取页码
                            this.finished=true;
                            this.loading = false;
                            this.init(this.page);
                        }, 2000);
                    }
                })
                //console.log('确定');
            }).catch(()=>{
                //console.log('取消')
            })
        },
        //下拉加载更多
        onLoad() {
            if(this.finished===false){
                this.loading=true;
                setTimeout(() => {
                    if(!this.error){
                        this.page += 1;
                    }
                    this.init(this.page);
                }, 1500);
            }
        },
    },
}
</script>