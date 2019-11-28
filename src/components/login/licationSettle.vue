<template>
    <div class="licationSettle">
        <!--头部-->
        <nav-bar title="申请入驻" :border=border :leftArrow=leftArrow></nav-bar>
        <!--内容-->
        <div class="addSite-content containerView-main">
            <div class="field-item f-bgf f-bdb">
                <div class="field-tip">商家名称：</div>
                <input class="field-input" v-model.trim="storeName" type="text" placeholder="请填写公司名称">
            </div>
            <div class="field-item f-bgf f-bdb">
                <div class="field-tip">联系人：</div>
                <input class="field-input" v-model.trim="name" type="text" placeholder="请填写联系人">
            </div>
            <div class="field-item f-bgf">
                <div class="field-tip">联系手机：</div>
                <input class="field-input" v-model.trim="phone" type="text" placeholder="请填写手机号码">
            </div>
            <!--确定按钮-->
            <div class="lication-btn">
                <div class="big-btn" @click="onSubmit">提交</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'licationSettle',
    data() {
        return {
            border:true,
            leftArrow:true,
            storeName:'',//商家名称
            name:'',//联系人
            phone:'',//联系手机
        }
    },
    methods: {
        onSubmit() {
            let textTips="";
            let regPhone = /^1(3|4|5|6|7|8|9)\d{9}$/;
            if(!this.storeName){
                textTips="请填写公司名称";
            }else if(!this.name){
                textTips="请填写联系人";
            }else if(!this.phone){
                textTips="请填写手机号码";
            }else if(!regPhone.test(this.phone)){
                textTips="请填写正确的手机号码";
            }
            if(textTips){
                this.$toast(textTips);
                return;
            }
            this.$axios.post('/user/apply',{
                company:this.storeName,
                contact:this.name,
                phone:this.phone
            }).then((res)=>{
                let data=res.data.data;
                if(data.code===1000){
                    let obj={
                        content:data.content,
                        phone:data.phone
                    }
                    sessionStorage.content=JSON.stringify(obj);
                    this.$router.push({
                        path:'licationSuccess'
                    })
                }
            })
        }
    },
}
</script>