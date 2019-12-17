<template>
    <div class="logistics">
        <!--头部-->
        <nav-bar title="查看物流" :border=border :leftArrow=leftArrow></nav-bar>
        <div class="logistics-content containerView-main">
            <!--订单信息-->
            <div class="logistics-order f-mgb f-bgf">
                <div class="logistics-order-img">
                    <img v-lazy="order.cover" alt="">
                    <span>共{{order.goods_num}}件商品</span>
                </div>
                <div class="logistics-order-txt">
                    <div class="logistics-order-title">物流状态：<span>{{data.state}}</span></div>
                    <div>承运来源：{{data.company.fullname}}</div>
                    <div>快递单号：{{order.express_no}}</div>
                    <div>官方电话：{{data.company.tel}}</div>
                </div>
            </div>
            <!--物流信息-->
            <div class="logistics-msg f-mgb f-bgf">
                <van-steps direction="vertical" :active="0">
                    <van-step v-for="(item,index) in data.data" :key="index">
                        <h3>{{item.desc}}</h3>
                        <p>{{item.time}}</p>
                    </van-step>
                </van-steps>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'logistics',
    data() {
        return {
            border: true,
            leftArrow:true,
            img:require("@/assets/images/05.png"),
            data:{},//物流信息内容
            order:{},//订单内容
            type:'',//物流状态
        }
    },
    created () {
        this.init();//初始化
    },
    methods: {
        //初始化获取物流信息
        init() {
            this.$axios.post(`/v1/goods/logistics?token=${sessionStorage.token}`,{
                order_id:this.$route.query.id
            }).then((res)=>{
                let data=res.data.data;
                if(data.code===1000){
                    this.order=data.order;
                    this.data=data.info;
                    //请求物流信息
                    //this.getLogistics(data.url);
                }else{
                    setTimeout(() => {
                        this.$router.go(-1);
                    }, 2000);
                }
            })
        },
        //请求物流信息
        // getLogistics(url){
        //     this.$axios.post(url).then((res)=>{
        //         this.data=res.data;
        //         this.data.data.reverse();
        //         switch (this.data.status) {
        //             case 1:
        //                 this.type='运输中';
        //                 break;
        //             case 2:
        //                 this.type='派送中';
        //                 break;
        //             case 3:
        //                 this.type='已签收';
        //                 break;
        //             default:
        //                 break;
        //         }
        //     })

        // }
    },
}
</script>