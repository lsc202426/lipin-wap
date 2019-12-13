<template>
    <div class="evaluateList">
        <!--头部-->
        <nav-bar title="评价列表" :url="url" :border=border :leftArrow=leftArrow></nav-bar>
        <!--内容-->
        <div class="containerView-main">
            <div class="address-list" v-if="lists&&lists.length>0">
                <van-list
                    v-model="loading"
                    :finished="finished"
                    @load="onLoad"
                    :immediate-check="false"
                    :error.sync="error"
                    error-text="请求失败，点击重新加载"
                  >
                    <div class="content-list">
                        <evaluate :list="lists" @giveLike="giveLike" :title="showTitle" :count="count" id="refEvaluate"></evaluate>
                    </div>
                    <van-divider dashed class="botton-line"  v-if="finished&&lists&&lists.length>0">
                        没有更多了
                    </van-divider>
                </van-list>
            </div>
            <div class="order" v-else>
                <no-data></no-data>
            </div>
        </div>
        <!--导航-->
    </div>
</template>
<script>
import evaluate from '@/components/common/evaluate.vue'
export default {
    name:'evaluateList',
    data() {
        return {
            border: true,
            leftArrow:true,
            showTitle:false,
            lists:[],//获取的接口数据内容
            loading: false, //是否触发加载
            finished: false, //数据加载完毕
            error:false,//若列表数据加载失败，将error设置成true即可显示错误提示，用户点击错误提示后会重新触发 load 事件
            page: 1, //页码
            url:`/goodsContent?id=${this.$route.query.id}`,
            count:0,
        }
    },
    created () {
        this.init(this.page);//初始化
    },
    methods: {
        //初始化获取地址数据
        init(page){
            this.$axios.post(`/v1/evaluate/plist?page=${page}&token=${sessionStorage.token}`,{
                guid:this.$route.query.id
            }).then((res)=>{
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
        },
        //点赞
        giveLike(t){
            this.$axios.post(`/v1/evaluate/like?token=${sessionStorage.token}`,{
                id:t.id,
                type:1,//1：评论点赞、2：回复点赞
            }).then((res)=>{
                let data=res.data.data;
                if(data.code===1000){
                    this.lists.forEach((item,index)=>{
                        if(item.id==t.id){
                            if(t.is_like){
                                item.is_like=false;
                                item.like-=1;
                            }else{
                                item.is_like=true;
                                item.like+=1;
                            }
                        }
                    })
                    this.$forceUpdate();
                }
            })
        }
    },
    components:{
        evaluate
    }
}
</script>