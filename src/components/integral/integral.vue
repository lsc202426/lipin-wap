<template>
    <div class="integral">
        <div class="integral-content containerView-main">
            <!--头部-->
            <div class="integral-content-top">
                <div class="integral-title">
                    <span class="go-back" @click="goBack"></span>
                    <div class="title">我的积分</div>
                </div>
                <div class="integral-msg">
                    <div class="msg-name">
                        赚取积分
                    </div>
                    <div class="integral-text">
                        积分规则
                    </div>
                </div>
            </div>
            <!--积分内容-->
            <div class="integral-content-txt">
                <div class="integral-box f-bgf">
                    <div class="integral-tit">
                        <div class="integral-tit-l">
                            我的积分
                        </div>
                        <div class="integral-tit-r price" @click="goDetail">
                            积分明细
                        </div>
                    </div>
                    <div class="integral-num">
                        {{integral}}
                    </div>
                </div>
                <div class="claim-integral">
                    <div class="big-btn" @click="drawIntegral">
                        认领积分
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'integral',
    data() {
        return {
            integral:0,//积分
        }
    },
    created () {
        this.init();//初始化
    },
    methods: {
        //获取初始数据
        init(){
            this.$axios.post('/v1/home/integral').then((res)=>{
                let data=res.data.data;
                if(data.code===1000){
                    this.integral=data.integral;
                }
            })
        },
        //返回上一页
        goBack(){
            this.$router.push({
                path:'/user'
            })
        },
        //前往积分明细
        goDetail(){
            this.$router.push({
                path:'/integralDetail'
            })
        },
        //认领积分
        drawIntegral(){
            this.$router.push({
                path:'/drawIntegral'
            })
        },
    },
}
</script>