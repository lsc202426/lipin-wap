<template>
    <div class="newsDetail containerView-main">
        <!--头部-->
        <nav-bar title="消息详情" :border=border :leftArrow=leftArrow></nav-bar>
        <div class="news-detail-content">
            <h2>{{data.title}}</h2>
            <div class="time">
                {{data.created}}
            </div>
            <div v-html="data.content"></div>
        </div>
    </div>
</template>
<script>
export default {
    name:'newsDetail',
    data() {
        return {
            border:true,
            leftArrow:true,
            data:{},//数据内容
        }
    },
    created () {
        this.init();//初始化
    },
    methods: {
        init() {
            if(this.$route.query.id){
                let id=this.$route.query.id;
                this.$axios.post(`/v1/home/messageDetail?token=${sessionStorage.token}`,{
                    guid:id
                }).then((res)=>{
                    let data=res.data.data;
                    if(data.code===1000){
                        this.data=data;
                    }
                })
            }
        }
    },
}
</script>