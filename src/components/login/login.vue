<template>
    <div class="login">
        <div class="login-content containerView-main">
            <div class="login-top">
                <div class="login-top-msg">
                    <p>欢迎来到</p>
                    <p>网聚礼品</p>
                </div>
                <div class="lication-settle" @click.stop="goLicationSettle">申请成为供应商</div>
            </div>
            <div class="login-content-box">
                <div class="login-form f-bgf">
                    <div class="login-form-title">用户登录</div>
                    <div class="login-form-item f-bdb">
                        <img class="icon-phone" v-lazy="iconPhone" alt="">
                        <input type="text" v-model.trim="phone" placeholder="请输入手机号">
                    </div>
                    <div class="login-form-item f-bdb">
                        <img class="icon-password" v-lazy="iconPass" alt="">
                        <input type="password" v-model.trim="password" placeholder="请输入密码">
                    </div>
                    <div class="big-btn" @click="login">登录</div>
                    <div class="go-index" @click="goIndex"><span></span>返回首页</div>
                </div>
            </div>
            <div class="operation-box">
                <span @click="forgetPass">忘记密码</span>
                <span @click="register">用户注册</span>
            </div>
        </div>
    </div>
</template>
<script>
import { clearSession } from "@/utils/index";
export default {
    name:'login',
    data() {
        return {
            phone:'',//手机号
            password:'',//密码
            iconPhone:require("@/assets/images/icon_shouji@2x.png"),//手机图标
            iconPass:require("@/assets/images/icon_mima@2x.png"),//密码图标
        }
    },
    created () {
        sessionStorage.clear();
    },
    mounted() {
        //禁用浏览器返回
        (function() {
            if (window.history && window.history.pushState) {
                window.onpopstate = function() {
                    window.history.pushState("forward", null, "");
                    window.history.forward(1);
                };
            }
            window.history.pushState("forward", null, ""); //在IE中必须得有这两行
            window.history.forward(1);
        })();
    },
    methods: {
        //登录
        login() {
            let textTips="";
            let regPhone = /^1(3|4|5|6|7|8|9)\d{9}$/;
            if(!this.phone){
                textTips="请填写手机号码";
            }else if(!regPhone.test(this.phone)){
                textTips="请填写正确的手机号码";
            }else if(!this.password){
                textTips="请填写密码";
            }
            if(textTips){
                this.$toast(textTips);
                return;
            }
            this.$axios.post(`/user/login?token=${sessionStorage.token}`,{
                username:this.phone,
                password:this.password,
            }).then((res)=>{
                let data=res.data.data;
                if(data.code===1000){
                    this.$toast({
                        message:'登录成功',
                        forbidClick:true
                    });
                    sessionStorage.token=data.token;
                    setTimeout(() => {
                        if (this.$route.query.redirect) {
                            this.$router.replace({
                                path: this.$route.query.redirect,
                            });
                        }else {
                            this.$router.replace({
                                path: '/',
                            });
                        }
                    }, 2000);
                }
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
            this.$router.push({
                path:'/register',
            })
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
                path:'licationSettle'
            })
        }
    },

}
</script>