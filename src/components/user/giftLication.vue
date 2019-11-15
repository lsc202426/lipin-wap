<template>
    <div class="giftLication">
        <!--头部-->
        <nav-bar title="礼品申请" :url="url" :border=border :leftArrow=leftArrow></nav-bar>
        <!--内容-->
        <div class="giftLication-content">
            <div class="field-item f-bgf f-bdb">
                <div class="field-tip">代理商：</div>
                <input class="field-input" value="广东互易网络知识产权有限公司" disabled type="text">
            </div>
            <div class="field-item f-bgf f-bdb">
                <div class="field-tip">客户名称：</div>
                <input class="field-input" v-model.trim="name" placeholder="请填写客户名称" type="text">
            </div>
            <div class="field-item f-bgf f-bdb">
                <div class="field-tip">联系人：</div>
                <input class="field-input" v-model.trim="link" placeholder="请填写联系人" type="text">
            </div>
            <div class="field-item f-bgf f-bdb">
                <div class="field-tip">手机：</div>
                <input class="field-input" v-model.trim="phone" placeholder="请填写联系人手机" type="tel">
            </div>
            <div class="field-item f-bgf f-bdb">
                <div class="field-tip">注册的点商标：</div>
                <input class="field-input" v-model.trim="dsbName" placeholder="请填写注册的点商标" type="text">
                <div class="field-tail">
                    .商标
                </div>
            </div>
            <div class="field-item f-bgf f-bdb">
                <div class="field-tip">点商标注册金额：</div>
                <input class="field-input" v-model.trim="dsbPrice" placeholder="请填写金额" type="number">
                <div class="field-tail">
                    元
                </div>
            </div>
            <div class="gift-btn">
                <div class="big-btn" @click="onSubmint">提交</div>
                <div class="price" @click="lockGift">查看申请过的礼品</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'giftLication',
    data() {
        return {
            border: true,
            leftArrow: true,
            url:'/user',
            name:'',//客户名称
            link:'',//联系人
            phone:'',//联系人手机
            dsbName:'',//注册的点商标
            dsbPrice:'',//点商标注册金额
        }
    },
    created () {
        
    },
    methods: {
        //查看申请过的礼品
        lockGift() {
            this.$router.push({
                path:'/giftList'
            })
        },
        //提交
        onSubmint(){
            this.$router.push({
                path:'/'
            })
        }
    },
}
</script>
