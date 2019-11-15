<template>
    <div class="modifyPhone modifyPass">
        <!--头部-->
        <nav-bar title="修改手机号" :border=border :leftArrow=leftArrow></nav-bar>
        <!--内容部分-->
        <div class="modify-phone-content">
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
        </div>
        <!--确认按钮-->
        <div class="modify-btn">
            <div class="big-btn" @click.stop="onSubmint">确定</div>
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
            codeTxt:'获取验证码',
        }
    },
    created () {
        
    },
    methods: {
        //确定提交
        onSubmint() {
            
        }
    },
}
</script>