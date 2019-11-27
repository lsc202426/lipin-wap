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
                        <div class="get-code" @click.stop="getCode">{{codeTxt}}</div>
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
                    <div class="go-index" @click="goIndex"><span></span>返回首页</div>
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
            isCodeIng:false,//是否倒计时
            codeTxt:'获取验证码',
        }
    },
    created () {
        
    },
    methods: {
        //确定提交
        forgetPass() {
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
            this.$axios.post(`/user/forgetpaw?token=${sessionStorage.token}`,{
                mobile_phone:this.phone,
                password:this.password,
                code:this.code
            }).then((res)=>{
                let data=res.data.data;
                if(data.code===1000){
                    this.$toast({
                        message:data.msg?data.msg:'修改密码成功',
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
        //用户登录
        login(){
            this.$router.push({
                path:'/login',
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
                    type:4
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
        }
    },

}
</script>