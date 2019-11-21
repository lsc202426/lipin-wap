<template>
    <div class="drawIntegral">
        <!--头部-->
        <nav-bar title="认领积分" :border=border :leftArrow=leftArrow></nav-bar>
        <!--内容-->
        <div class="draw-content containerView-main">
            <div class="field-item f-bgf f-mgb">
                <div class="field-tip">点商标名称：</div>
                <input class="field-input" v-model.trim="name" @blur.prevent="checkIntegral" type="text" placeholder="请填写点商标名称">
                <div class="field-tail">.商标</div>
            </div>
            <div v-if="isCheckInt" class="check-integral f-bgf">
                <span class="check-integral-img" @click="closeCheckTips"></span>
                <span>该名称已认领积分，请重试</span>
            </div>
            <div class="draw-tips">请填写注册点商标预留的经办人手机</div>
            <div class="field-item f-bgf f-bdb">
                <div class="field-tip">经办人手机：</div>
                <input class="field-input" v-model.trim="phone" type="text" placeholder="请填写手机号码">
                <div class="field-tail get-code" @click="getCode">{{codeTxt}}</div>
            </div>
            <div class="field-item f-bgf">
                <div class="field-tip">验证码：</div>
                <input class="field-input" v-model.trim="code" type="text" placeholder="请填写验证码">
            </div>
            <div class="claim-integral">
                <div class="big-btn" @click="onSubmit">
                    提交
                </div>
            </div>
        </div>
        <!--认领成功-->
        <van-dialog
            v-model="show"
            :showConfirmButton="false"
            >
            <div class="dialog-box">
                <div class="dialog-con">
                    <van-divider>当前积分</van-divider>
                    <div class="integral-num">{{integral}}<span>分</span></div>
                </div>
            </div>
            <div class="dialog-bottom">
                <div class="dialog-btn dialog-cancel" @click="cancel">继续认领</div>
                <div class="dialog-btn dialog-confirm" @click="confirm">去选礼品</div>
            </div>
        </van-dialog>
    </div>
</template>
<script>
export default {
    name:'drawIntegral',
    inject:['reload'],//注入依赖
    data() {
        return {
            border:true,
            leftArrow:true,
            name:'',//点商标名称
            phone:'',//手机号码
            code:'',//验证码
            codeTxt:'获取验证码',
            isCodeIng:false,//是否倒计时
            show:false,//认领成功弹层
            integral:0,//积分数量
            isCheckInt:false,//是否已经人领过积分
        }
    },
    created () {
        
    },
    mounted() {

    },
    methods: {
        //提交
        onSubmit(){
            let textTips="";
            let regPhone = /^1(3|4|5|6|7|8|9)\d{9}$/;
            if(!this.name){
                textTips="请填写点商标名称";
            }else if(!this.phone){
                textTips="请填写手机号码";
            }else if(!regPhone.test(this.phone)){
                textTips="请填写正确的手机号码";
            }else if(!this.code){
                textTips="请填写验证码";
            }
            if(textTips){
                this.$toast(textTips);
                return;
            }
            this.$axios.post(`/v1/home/claimIntegral?token=${sessionStorage.token}`,{
                domain_name:this.name,
                mobile_phone:this.phone,
                code:this.code
            }).then((res)=>{
                let data=res.data.data;
                if(data.code===1000){
                    //显示认领成功
                    this.show=true;
                    this.integral=data.integral;
                }
            })
        },
        //检测域名是否人领过积分
        checkIntegral(){
            if(!this.name){
                this.$toast('请填写点商标名称');
                return;
            }
            this.$axios.post(`/v1/home/checkClaimIntegral?token=${sessionStorage.token}`,{
                domain_name:this.name
            }).then((res)=>{
                let data=res.data.data;
                if(data.code===1000){
                    this.isCheckInt=false;
                }else{
                    this.isCheckInt=true;
                }
            })
        },
        //获取验证码
        getCode(){
            let regPhone = /^1(3|4|5|6|7|8|9)\d{9}$/;
            if(!this.isCodeIng){
                if(!this.name){
                    this.$toast('请填写点商标名称');
                    return;
                }else if(!this.phone){
                    this.$toast('请填写手机号码');
                    return;
                }else if(!regPhone.test(this.phone)){
                    this.$toast('请填写正确的手机号码');
                    return;
                }
                this.$axios.post(`/site/sendSms?token=${sessionStorage.token}`,{
                    mobile_phone:this.phone,
                    type:2
                }).then((res)=>{
                    let data=res.data.data;
                    if(data.code===1000){
                        this.$toast('获取成功');
                        //获取验证码倒计时
                        this.isCodeIng = true;
                        let time = 60;
                        let timer = setInterval(()=> {
                            time--;
                            this.codeTxt = '重新获取'+ time + 's';
                            if (time <= 0) {
                                this.codeTxt = '获取验证码';
                                this.isCodeIng = false;
                                clearInterval(timer);
                            }
                        }, 1000);
                    }
                })
                
            }
        },
        //继续认领
        cancel(){
            this.show=false;
            this.reload();
        },
        //去选礼品
        confirm(){
            this.show=false;
            //前往首页
            this.$router.push({
                path:'/'
            })
        },
        //隐藏提示
        closeCheckTips(){
            this.isCheckInt=false;
        }
    },
}
</script>