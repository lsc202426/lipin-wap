<template>
    <van-nav-bar
        :title="title"
        fixed
        :url="url"
        :border=border
        :left-arrow=leftArrow
        @click-left="onClickLeft"
        />
</template>
<script>
export default {
    props:{
        title:String,
        border:Boolean,
        leftArrow:Boolean,
        url:String,
    },
    methods: {
        onClickLeft() {
            if(this.url){
                this.$router.push({
                    path:this.url
                })
            }else{
                this.$router.go(-1);
            }
        }
    }
}
</script>