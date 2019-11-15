<template>
    <div class="modifyPhone">
        <!--头部-->
        <nav-bar title="修改手机号" :border=border :leftArrow=leftArrow></nav-bar>
        <!--内容部分-->
        <div class="modify-phone-content">
            <div class="field-item f-bgf f-bdb">
                <div class="field-tip">手机号：</div>
                <input class="field-input" v-model.trim="phone" type="text" placeholder="请填写新手机号">
                <div class="field-tail get-code" @click="getCode">{{codeTxt}}</div>
            </div>
            <div class="field-item f-bgf">
                <div class="field-tip">验证码：</div>
                <input class="field-input" v-model.trim="code" type="text" placeholder="请填写验证码">
            </div>
        </div>
        <!--确认按钮-->
        <div class="modify-btn">
            <div class="big-btn">确定</div>
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
        }
    },
    created () {
        
    },
    methods: {
        getCode() {
            
        }
    },
}
</script>