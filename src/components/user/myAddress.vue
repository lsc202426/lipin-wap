<template>
    <div class="myAddress">
        <!--头部-->
        <nav-bar title="我的地址" :url="url" :border=border :leftArrow=leftArrow></nav-bar>
        <!--内容-->
        <div class="address-content containerView-main">
            <div class="address-list" v-if="lists&&lists.length>0">
                <van-list
                    v-model="loading"
                    :finished="finished"
                    @load="onLoad"
                    :immediate-check="false"
                    :error.sync="error"
                    error-text="请求失败，点击重新加载"
                  >
                    <div @click="selectSite(list)" class="address-item f-bgf" :class="{'f-bdb':index!=lists.length-1}" v-for="(list,index) in lists" :key="index">
                        <div class="address-item-txt">
                            <div>{{list.name}}</div>
                            <div>{{list.cellphone}}</div>
                            <div class="mark">{{list.label}}</div>
                        </div>
                        <div class="address-item-ress">
                            {{list.address}}
                        </div>
                    </div>
                    <van-divider dashed class="botton-line" v-if="finished">
                        没有更多了
                    </van-divider>
                </van-list>
            </div>
            <no-data v-else text="您还没有添加地址"></no-data>
        </div>
        <!--底部按钮-->
        <div class="fixed-btn">
            <div class="big-btn" @click="addSite">添加地址</div>
        </div>
    </div>
</template>
<script>
export default {
    name:'myAddress',
    data() {
        return {
            border: true,
            leftArrow:true,
            lists:[],//获取的接口数据内容
            loading: false, //是否触发加载
            finished: false, //数据加载完毕
            error:false,//若列表数据加载失败，将error设置成true即可显示错误提示，用户点击错误提示后会重新触发 load 事件
            page: 1, //页码
            url:`/settle?id=${this.$route.query.id}`,
        }
    },
    created () {
        this.init(this.page);//初始化
    },
    methods: {
        //初始化获取地址数据
        init(page){
            this.$axios.post(`/v1/home/myAddress?page=${page}&token=${sessionStorage.token}`).then((res)=>{
                let data=res.data.data;
                if (data.code === 1000) {
                    if (page <= 1) {
                        this.lists=data.list;
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
                }else{
                    this.error=true;
                }
            })
        },
        //新增地址
        addSite() {
            this.$router.push({
                path:'/addSite'
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
        //选择地址
        selectSite(list){
            sessionStorage.address=JSON.stringify(list);//选择地址之后存储地址信息
            //判断是否是从结算页面过来
            if(this.$route.query.id){
                //如果是，跳转回结算页面
                this.$router.push({
                    path:'/settle',
                    query:{
                        id:this.$route.query.id
                    }
                })
            }else{
                //如果不是，预留后面做地址编辑
            }
        }
    },
}
</script>