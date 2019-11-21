<template>
    <div class="login forgetPass">
        <div class="login-content containerView-main">
            <div class="login-top">
                <div class="login-top-msg">
                    <p>欢迎来到</p>
                    <p>网聚礼品.商标</p>
                </div>
            </div>
            <div class="login-content-box">
                <div class="login-form f-bgf">
                    <div class="login-form-title">忘记密码</div>
                    <div class="login-form-item f-bdb">
                        <img class="icon-phone" v-lazy="iconPhone" alt="">
                        <input type="text" v-model.trim="phone" placeholder="请输入手机号">
                        <div class="get-code" @click.stop="getCode">获取验证码</div>
                    </div>
                    <div class="login-form-item f-bdb">
                        <img class="icon-phone" v-lazy="iconCode" alt="">
                        <input type="text" v-model.trim="code" placeholder="请输入验证码">
                    </div>
                    <div class="login-form-item f-bdb">
                        <img class="icon-password" v-lazy="iconPass" alt="">
                        <input type="password" v-model.trim="password" placeholder="请输入新密码">
                    </div>
                    <div class="big-btn" @click="forgetPass">确定</div>
                </div>
            </div>
            <div class="operation-box">
                <span @click="login">用户登录</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'forgetPass',
    data() {
        return {
            phone:'',//手机号
            password:'',//密码
            code:'',//验证码
            iconPhone:require("@/assets/images/icon_shouji@2x.png"),//手机图标
            iconPass:require("@/assets/images/icon_mima@2x.png"),//密码图标
            iconCode:require("@/assets/images/icon_yanzhengma@2x.png"),//验证码
        }
    },
    created () {
        
    },
    methods: {
        //确定提交
        forgetPass() {
            
        },
        //用户登录
        login(){
            this.$router.push({
                path:'/login',
            })
        },
        //获取验证码
        getCode(){

        }
    },

}
</script>