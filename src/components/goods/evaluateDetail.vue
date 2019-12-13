<template>
    <div class="evaluateDetail">
        <!--头部-->
        <nav-bar title="评价详情" :border=border :leftArrow=leftArrow></nav-bar>
        <div class="containerView-main evaluate-detail">
            <!--评价信息-->
            <div class="f-bgf f-mgb">
                <div class="evaluate-detail-con f-mgb">
                    <div class="detail-top">
                        <div class="detail-img">
                            <img v-lazy="head" alt="">
                        </div>
                        <div class="detail-top-r">
                            <div class="detail-name">
                                <div>{{lists.frommembername}}</div>
                                <div class="detail-time">{{lists.created}}</div>
                            </div>
                            <div class="detail-value">
                                <van-rate v-model="lists.scores" color="#FF6A00" void-icon="star" size="0.26rem" gutter="0.06rem" void-color="#D9D9D9" allow-half readonly />
                            </div>
                        </div>
                    </div>
                    <div class="detail-text">
                        {{lists.content}}
                    </div>
                    <div class="images-list">
                        <div class="images-detail" v-for="(img,index) in lists.image" :key="index">
                            <img v-lazy="img" alt="">
                        </div>
                    </div>
                </div>
            </div>
            <!--回复信息-->
            <div class="reply-list-box">
                <van-list
                    v-model="loading"
                    :finished="finished"
                    @load="onLoad"
                    :immediate-check="false"
                    :error.sync="error"
                    error-text="请求失败，点击重新加载"
                  >
                    <div class="reply-list f-bgf" v-if="count&&count>0">
                        <div class="reply-list-title">
                            {{count}}条回复
                        </div>
                        <div class="reply-item f-bdb" v-for="(item,index) in replyLists" :key="index">
                            <div class="reply-img">
                                <img v-lazy="head" alt="">
                            </div>
                            <div class="reply-con">
                                <div class="reply-con-top">
                                    <div class="reply-top-name">
                                        <div>{{item.replay_name}}</div>
                                        <div class="time">{{item.reply_created}}</div>
                                    </div>
                                    <div class="reply-top-sup" :class="{'reply-top-sup-active':item.is_like}" @click.stop="giveLike(item)">
                                        {{item.reply_like}}
                                    </div>
                                </div>
                                <div class="reply-con-text">
                                    {{item.reply_content}}
                                </div>
                            </div>
                        </div>
                    </div>
                    <van-divider dashed class="botton-line"  v-if="finished&&replyLists&&replyLists.length>0">
                        没有更多了
                    </van-divider>
                </van-list>
            </div>
        </div>
        <!--底部框-->
        <div class="evaluate-detail-bot f-bgf">
            <div class="bot-box">
                <div class="bot-text" @click.stop="fillEvaluate">说点什么吧！</div>
                <div class="bot-sup" @click.stop="giveLike(lists,'obj')" :class="{'bot-sup-active':lists.is_like}">{{lists.like}}</div>
                <div class="bot-num">{{lists.reply_num}}</div>
            </div>
        </div>
        <van-popup
        v-model="show"
        position="bottom"
        @opened="openPopup"
        >
            <div class="popup-con">
                <div class="popup-top">
                    <div class="popup-top-cancel" @click.stop="cancel">取消</div>
                    <div class="popup-top-confirm price" @click.stop="confirm">确认</div>
                </div>
                <div class="popup-evaluate">
                    <input ref="refInput" placeholder="快来写下您的评价吧！" type="text" v-model.trim="evaluateTxt">
                </div>
            </div>
        </van-popup>
    </div>
</template>
<script>
export default {
    name:'evaluateDetail',
    data() {
        return {
            border: true,
            leftArrow:true,
            loading: false, //是否触发加载
            finished: false, //数据加载完毕
            error:false,//若列表数据加载失败，将error设置成true即可显示错误提示，用户点击错误提示后会重新触发 load 事件
            page: 1, //页码
            lists:{},
            replyLists:[],//回复列表
            show:false,//是否显示弹出层
            evaluateTxt:'',//评论内容
            head: require("@/assets/images/user_head@2x.png"),
            count:0,//回复总数
            once:true,
        }
    },
    created () {
        //初始化获取评论数据
        this.init(this.page);
    },
    methods: {
        //初始化
        init(page){
            this.$axios.post(`/v1/evaluate/detail?page=${page}&token=${sessionStorage.token}`,{
                id:this.$route.query.id
            }).then((res)=>{
                let data = res.data.data;
                if (data.code === 1000) {
                    if (page <= 1) {
                        this.replyLists=data.replay;
                        this.lists = data.info;
                        this.count=data.replay_count;
                    } else {
                        this.replyLists.push.apply(this.replyLists, data.replay);
                    }
                    this.once=false;
                    //加载状态结束
                    this.loading = false;
                    //数据全部加载完成
                    if (this.replyLists.length==data.replay_count) {
                        this.finished = true;
                    }else{
                        this.finished=false;
                    }
                }else{
                    this.error=true;
                }
            })
        },
        //填写评论
        fillEvaluate(){
            this.show=true;
        },
        openPopup(){
            this.$refs.refInput.focus();
        },
        //取消填写
        cancel(){
            this.show=false;
        },
        //确认
        confirm(){
            if(this.evaluateTxt.length<=0){
                this.$toast('请填写评价内容');
                return;
            }
            this.$axios.post(`/v1/evaluate/replay?token=${sessionStorage.token}`,{
                id:this.$route.query.id,
                reply_content:this.evaluateTxt
            }).then((res)=>{
                let data = res.data.data;
                if(data.code=1000){
                    this.$toast({
                        message:'评价成功',
                        forbidClick:true
                    })
                    setTimeout(() => {
                        this.page=1;
                        this.finished=true;
                        this.loading=false;
                        this.init(this.page);
                    }, 1500);
                }
            })
            
            this.show=false;
        },
        //下拉加载更多
        onLoad() {
            if(this.finished===false&&!this.once){
                this.loading=true;
                setTimeout(() => {
                    if(!this.error){
                        this.page += 1;
                    }
                    this.init(this.page);
                }, 1500);
            }
        },
        //点赞
        giveLike(t,o){
            this.$axios.post(`/v1/evaluate/like?token=${sessionStorage.token}`,{
                id:t.id,
                type:2,//1：评论点赞、2：回复点赞
            }).then((res)=>{
                let data=res.data.data;
                if(data.code===1000){
                    if(o&&o==='obj'){
                        if(t.is_like){
                            t.is_like=false;
                            t.like-=1;
                        }else{
                            t.is_like=true;
                            t.like+=1;
                        }
                    }else{
                        this.replyLists.forEach((item,index)=>{
                            if(item.id==t.id){
                                if(t.is_like){
                                    item.is_like=false;
                                    item.reply_like-=1;
                                }else{
                                    item.is_like=true;
                                    item.reply_like+=1;
                                }
                            }
                        })
                    }
                    this.$forceUpdate();
                }
            })
        }
    },
}
</script>