<template>
    <div class="modifyPhone">
        <!--头部-->
        <nav-bar title="修改手机号" :border=border :leftArrow=leftArrow></nav-bar>
        <!--内容部分-->
        <div class="modify-phone-content containerView-main">
            <div class="field-item f-bgf f-bdb">
                <div class="field-tip">手机号：</div>
                <input class="field-input" v-model.trim="phone" type="text" placeholder="请填写新手机号">
                <div class="field-tail get-code field-position" @click="getCode">{{codeTxt}}</div>
            </div>
            <div class="field-item f-bgf">
                <div class="field-tip">验证码：</div>
                <input class="field-input" v-model.trim="code" type="text" placeholder="请填写验证码">
            </div>
            <!--确认按钮-->
            <div class="modify-btn">
                <div class="big-btn" @click.stop="onSubmint">确定</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'modifyPhone',
    data() {
        return {
            border: true,
            leftArrow: true,
            phone:'',//手机号
            code:'',//验证码
            codeTxt:'获取验证码',
            isCodeIng:false,//是否倒计时
        }
    },
    created () {
        
    },
    methods: {
        //确认
        onSubmint(){
            let textTips="";
            let regPhone = /^1(3|4|5|6|7|8|9)\d{9}$/;
            if(!this.phone){
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
            this.$axios.post(`/v1/home/editPhone?token=${sessionStorage.token}`,{
                mobile_phone:this.phone,
                code:this.code
            }).then((res)=>{
                let data=res.data.data;
                if(data.code===1000){
                    this.$toast({
                        message:data.msg?data.msg:'修改成功,请重新登录',
                        forbidClick:true
                    });
                    setTimeout(() => {
                        this.$router.push('/login');
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
                    type:3
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
    },
}
</script>