<template>
    <div class="login register">
        <div class="login-content containerView-main">
            <div class="login-top">
                <!-- <div class="login-top-msg">
                    <p>欢迎来到</p>
                    <p>网聚礼品.商标</p>
                </div> -->
            </div>
            <div class="login-content-box">
                <div class="login-form f-bgf">
                    <div class="login-form-title">会员注册</div>
                    <div class="login-form-item f-bdb">
                        <img class="icon-phone" v-lazy="iconPhone" alt="">
                        <input type="number" class="phone-input" v-model.trim="phone" placeholder="请输入手机号">
                        <div class="get-code" @click.stop="getCode">{{codeTxt}}</div>
                    </div>
                    <div class="login-form-item f-bdb">
                        <img class="icon-phone" v-lazy="iconCode" alt="">
                        <input type="text" v-model.trim="code" placeholder="请输入验证码">
                    </div>
                    <div class="login-form-item f-bdb">
                        <img class="icon-password" v-lazy="iconPass" alt="">
                        <input type="password" v-model.trim="password" placeholder="请输入8到16位英文和数字密码">
                    </div>
                    <div class="big-btn" @click="register">注册</div>
                    <div class="go-index price" @click="goIndex"><span></span>返回首页</div>
                </div>
            </div>
            <div class="operation-box">
                <span @click="forgetPass">忘记密码</span>
                <span @click="login">会员登录</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'register',
    data() {
        return {
            phone:'',//手机号
            password:'',//密码
            code:'',//验证码
            iconPhone:require("@/assets/images/icon_shouji@2x.png"),//手机图标
            iconPass:require("@/assets/images/icon_mima@2x.png"),//密码图标
            iconCode:require("@/assets/images/icon_yanzhengma@2x.png"),//验证码
            isCodeIng:false,//是否倒计时
            codeTxt:'获取验证码',
        }
    },
    created () {
        
    },
    methods: {
        //用户登录
        login() {
            this.$router.push({
                path:'/login',
            })
        },
        //忘记密码
        forgetPass(){
            this.$router.push({
                path:'/forgetPass',
            })
        },
        //用户注册
        register(){
            let textTips="";
            let regPhone = /^1(3|4|5|6|7|8|9)\d{9}$/;
            let regPass=/^(?=.*[A-Za-z])(?=.*\d)[^]{8,16}$/;
            if(!this.phone){
                textTips="请填写手机号码";
            }else if(!regPhone.test(this.phone)){
                textTips="请填写正确的手机号码";
            }else if(!this.code){
                textTips="请填写验证码";
            }else if(!this.password){
                textTips="请填写密码";
            }else if(!regPass.test(this.password)){
                textTips="请输入8到16位英文和数字密码";
            }
            if(textTips){
                this.$toast(textTips);
                return;
            }
            this.$axios.post(`/user/register?token=${sessionStorage.token}`,{
                mobile_phone:this.phone,
                password:this.password,
                code:this.code
            }).then((res)=>{
                let data=res.data.data;
                if(data.code===1000){
                    this.$toast({
                        message:'注册成功',
                        forbidClick:true
                    });
                    setTimeout(() => {
                        this.$router.push({
                            path:'/login'
                        });
                    }, 2000);
                }
            })
        },
        //获取验证码
        getCode(){
            let textTips="";
            let regPhone = /^1(3|4|5|6|7|8|9)\d{9}$/;
            if(!this.isCodeIng){
                if(!this.phone){
                    textTips="请填写手机号码";
                }else if(!regPhone.test(this.phone)){
                    textTips="请填写正确的手机号码";
                }
                if(textTips){
                    this.$toast(textTips);
                    return;
                }
                this.$axios.post(`/site/sendSms?token=${sessionStorage.token}`,{
                    mobile_phone:this.phone,
                    type:1
                }).then((res)=>{
                    let data=res.data.data;
                    if(data.code===1000){
                        this.$toast({
                            message:data.msg?data.msg:'获取成功',
                            forbidClick:true
                        });
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
        //返回首页
        goIndex(){
            this.$router.push({
                path:'/'
            })
        },
        //前往申请成为供应商页面
        goLicationSettle(){
            this.$router.push({
                path:'licationGain'
            })
        }
    },

}
</script>