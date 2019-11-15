<template>
    <div class="integralDetail">
        <!--头部-->
        <nav-bar title="积分明细" :border=border :leftArrow=leftArrow></nav-bar>
        <!--导航栏-->
        <van-tabs @change="onClick" 
        title-active-color="#FF6702" 
        title-inactive-color="#333"
        swipeable
        >
            <van-tab :title="item" v-for="(item,index) in navTitle" :key="index">
                <div class="msg-list">
                    <div class="msg-list-item f-bgf" v-for="(list,index) in lists" :key="index">
                        <div class="item-con">
                            <div class="title-and-time">
                                <span class="title">{{list.memo}}</span>
                            </div>
                            <div class="item-con-txt">{{list.created}}</div>
                        </div>
                        <div class="item-price">
                            <span class="price">
                                {{list.integral}}
                            </span>
                        </div>
                    </div>
                    <van-divider dashed class="botton-line" v-if="lists.length>0">
                        没有更多了
                    </van-divider>
                    
                </div>
            </van-tab>
        </van-tabs>
        <!--暂无数据-->
        <no-data v-if="lists.length<=0"></no-data>
    </div>
</template>
<script>
export default {
    name:'integralDetail',
    data() {
        return {
            border:false,
            leftArrow:true,
            type:1,//明细类型
            navTitle:[
                '消费明细','充值明细'
            ],
            lists:[]
        }
    },
    created () {
        this.init(this.type);//初始化
    },
    methods: {
        onClick(name, title) {//name是索引，title是标题
            //this.$toast(name,title);
            if(name===0){
                this.type=1;
            }else if(name===1){
                this.type=2;
            }
            this.init(this.type);
        },
        //获取初始数据
        init(i){
            this.$axios.post('/v1/home/integralDetail',{
                type:i
            }).then((res)=>{
                let data=res.data.data;
                if(data.code===1000){
                    this.lists=data.integral_record;
                }
            })
        },
    },
}
</script>