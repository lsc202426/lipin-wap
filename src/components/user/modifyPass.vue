<template>
    <div class="modifyPhone modifyPass">
        <!--头部-->
        <nav-bar title="修改手机号" :border=border :leftArrow=leftArrow></nav-bar>
        <!--内容部分-->
        <div class="modify-phone-content containerView-main">
            <div class="modify-pass-list f-bgf">
                <div class="field-item f-bdb">
                    <div class="field-tip">旧密码：</div>
                    <input class="field-input" v-model.trim="oldPass" type="password" placeholder="请填写旧密码">
                </div>
                <div class="field-item f-bdb">
                    <div class="field-tip">新密码：</div>
                    <input class="field-input" v-model.trim="newPass1" type="password" placeholder="请填写新密码">
                </div>
                <div class="field-item f-bdb">
                    <div class="field-tip">新密码：</div>
                    <input class="field-input" v-model.trim="newPass2" type="password" placeholder="请再次填写新密码">
                </div>
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
    name:'modifyPass',
    data() {
        return {
            border: true,
            leftArrow: true,
            oldPass:'',//旧密码
            newPass1:'',//新密码
            newPass2:'',//确认密码
        }
    },
    created () {
        
    },
    methods: {
        //确定提交
        onSubmint() {
            let textTips="";
            let regPass=/^(?=.*[A-Za-z])(?=.*\d)[^]{8,16}$/;
            if(!this.oldPass){
                textTips="请填写密码";
            }else if(!this.newPass1){
                textTips="请填写新密码";
            }else if(!this.newPass2){
                textTips="请再次填写新密码";
            }else if(this.newPass1!==this.newPass2){
                textTips="两次数据的新密码不一致";
            }else if(!regPass.test(this.newPass1)||!regPass.test(this.newPass2)){
                textTips="请输入8到16位英文和数字密码";
            }
            if(textTips){
                this.$toast(textTips);
                return;
            }
            this.$axios.post(`/v1/home/editPassword?token=${sessionStorage.token}`,{
                opassword:this.oldPass,
                npassword:this.newPass1,
                npassword2:this.newPass2
            }).then((res)=>{
                let data=res.data.data;
                if(data.code===1000){
                    this.$toast({
                        message:data.msg?data.msg:'修改成功,请重新登录',
                        forbidClick:true
                    });
                    setTimeout(() => {
                        this.$router.push({
                            path:'/login'
                        });
                    }, 2000);
                }
            })
        }
    },
}
</script>