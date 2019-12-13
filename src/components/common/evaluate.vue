<template>
    <div class="evaluate f-bgf">
        <div class="evaluate-con">
            <div class="evaluate-con-title f-bdb" v-if="title&&count>0">
                <div class="num">评价（{{count}}）</div>
                <div class="more" @click.stop="goEvaluateList">更多评价</div>
            </div>
            <div class="evaluate-list">
                <div class="evaluate-item f-bdb" v-for="(item,index) in list" :key="index" @click.stop="goEvaluatDetail(item.id)">
                    <div class="item-img">
                        <img v-lazy="head" alt="">
                    </div>
                    <div class="item-content">
                        <div class="item-top">
                            <div class="item-name">{{item.frommembername}}</div>
                            <div class="item-time">{{item.created}}</div>
                        </div>
                        <div class="item-value">
                            <van-rate v-model="item.scores" color="#FF6A00" void-icon="star" size="0.26rem" gutter="0.06rem" void-color="#D9D9D9" allow-half readonly />
                        </div>
                        <div class="item-text">
                            {{item.content}}
                        </div>
                        <div class="images-list">
                            <div class="images-item" v-for="(img,index) in list.image" :key="index">
                                <img v-lazy="img" alt="">
                            </div>
                        </div>
                        <div class="item-content-bot">
                            <div class="evaluate-num">
                                {{item.reply_num}}
                            </div>
                            <div class="good-box" @click.stop="giveLike(item)" :class="{'good-box-active':item.is_like}">
                                {{item.like}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="no-evaluate" v-if="title&&count<=0">
            暂无评价
        </div>
    </div>
</template>
<script>
export default {
    name:"evaluate",
    props:{
        list:Array,
        title:Boolean,
        count:Number,
    },
    data() {
        return {
            head: require("@/assets/images/user_head@2x.png"),
        }
    },
    methods: {
        goEvaluateList(){
            this.$router.push({
                path:'/evaluateList',
                query:{
                    id:this.$route.query.id
                }
            })
            
        },
        goEvaluatDetail(id){
            this.$router.push({
                path:'/evaluateDetail',
                query:{
                    id:id
                }
            })
        },
        //点赞
        giveLike(item){
            this.$emit('giveLike',item);
        }
    },
}
</script>