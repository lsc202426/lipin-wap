<template>
    <div class="settle">
        <div class="settle-content containerView-main">
            <!--头部内容-->
            <div class="settle-top">
                <div class="settle-title">
                    <span class="go-back" @click.stop="goBack"></span>
                    <div class="title">订单结算</div>
                </div>
                <div class="address-msg" @click="goAddress">
                    <div v-if="Object.keys(address).length != 0">
                        <div class="msg-name">
                            <span>{{address.name}}</span>
                            <span>{{address.cellphone}}</span>
                        </div>
                        <div class="address-text">
                            {{address.address}}
                        </div>
                        <!-- <div class="address-code">510000</div> -->
                    </div>
                    <div v-else>请添加收货地址</div>
                </div>
            </div>
            <!--内容部分-->
            <div class="settle-con-box">
                <div class="goods-msg f-bgf f-mgb">
                    <div class="goods-item f-bdb" v-for="(item,index) in goodsList" :key="index">
                        <div class="goods-item-con">
                            <div class="goods-img">
                                <img v-lazy="item.cover" alt="">
                            </div>
                            <div class="goods-txt">
                                <div class="goods-title">
                                    <div class="title">{{item.title}}</div>
                                    <div class="num">x{{item.num}}</div>
                                </div>
                                <div class="goods-txt-spce">
                                    <div>
                                        {{item.spec}}
                                    </div>
                                    <div class="goods-price price">
                                        <span>￥</span>{{item.price}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="goods-tab f-bdb">
                        <div>商品价格：</div>
                        <div class="price">
                            <span>￥</span>{{total}}
                        </div>
                    </div>
                    <!-- <div class="goods-tab">
                        <div>配送费用：</div>
                        <div>包邮</div>
                    </div> -->
                </div>
                <!--备注-->
                <div class="goods-tab goods-tab-i f-mgb f-bgf">
                    <div>备注：</div>
                    <input v-model="remark" type="text" placeholder="请填写订单备注">
                </div>
                <!--可用积分与需支付金额-->
                <div class="goods-tab f-bdb f-bgf" @click="changeIntCheck">
                    <div>可用积分：</div>
                    <div class="integral">
                        <span>{{integral|numToFloat}}（1积分=1元）</span>
                        <span class="icon-checkbox" :class="{'icon-checkbox-active':isIntegral}"></span>
                    </div>
                </div>
                <div class="goods-tab f-bgf f-mgb">
                    <div>仍需支付：</div>
                    <div class="price">
                        <span>￥</span>{{needToPay|numToFloat}}
                    </div>
                </div>
                <!--支付方式-->
                <div class="pay-mode f-mgb" v-if="needToPay>0">
                    <div class="title">请选择支付方式</div>
                    <!-- <div class="goods-tab f-bdb f-bgf" @click.stop="checkPayType(0)">
                        <div class="pay-item">
                            <div class="img-box">
                                <img v-lazy="imgWx" class="imgWx" alt="">
                            </div>
                            <span>微信支付</span>
                        </div>
                        <div class="icon-checkbox" :class="{'icon-checkbox-active':payType==0}"></div>
                    </div> -->
                    <div class="goods-tab f-bdb f-bgf" @click.stop="checkPayType(1)">
                        <div class="pay-item">
                            <div class="img-box">
                                <img v-lazy="imgZfbx" class="imgZfb" alt="">
                            </div>
                            <span>支付宝支付</span>
                        </div>
                        <div class="icon-checkbox" :class="{'icon-checkbox-active':payType==1}"></div>
                    </div>
                    <div class="goods-tab f-bdb f-bgf" @click.stop="checkPayType(2)">
                        <div class="pay-item">
                            <div class="img-box">
                                <img v-lazy="imgYl" class="imgYl" alt="">
                            </div>
                            <span>银联支付</span>
                        </div>
                        <div class="icon-checkbox" :class="{'icon-checkbox-active':payType==2}"></div>
                    </div>
                </div>
            </div>
        </div>
        <!--底部栏目-->
        <div class="settle-bottom f-bgf">
            <div class="settle-bottom-text">
                <span>共{{count}}件，应付金额：</span>
                <span class="price">
                    <span>￥</span>{{needToPay|numToFloat}}
                </span>
            </div>
            <div class="payment-btn f-bgc1" @click="goPay">去兑换</div>
        </div>
    </div>
</template>
<script>
export default {
    name:'settle',
    data() {
        return {
            imgWx:require("@/assets/images/icon_weixin@2x.png"),//商品图片
            imgZfbx:require("@/assets/images/icon_zhifubao@2x.png"),//商品图片
            imgYl:require("@/assets/images/icon_yinlian@2x.png"),//商品图片
            total:0,//支付总额
            integral:0,//可用积分
            isIntegral:true,//是否使用积分
            needToPay:0,//需支付总额
            payType:1,//默认选中支付方式，0：微信；1：支付宝；2：银联
            goodsList:[],//商品列表
            address:{},//地址信息
            source:'',//来源地址
            remark:'',//备注
            count:0,//总共多少件商品
        }
    },
    created () {
        if(this.$route.query.token){
            sessionStorage.token=this.$route.query.token;
            sessionStorage.beforPath=this.$route.query.beforPath;
            if(this.$route.query.goodsId){
                sessionStorage.goodsId=this.$route.query.goodsId;
            }
            this.$router.push({
                path:'/settle',
                query:{
                    id:this.$route.query.id
                }
            })
        }
        setTimeout(() => {
            this.init();//初始化
        }, 50);
    },
    methods: {
        //初始化获取数据
        init(){
            //判断来源
            if(localStorage.orderId){//如果是支付返回回来
                window.location.href =`${this.$config.api.public_chinese_url}/paySuccess?id=${localStorage.orderId}&token=${localStorage.token}`;
                // this.$router.push({
                //     path:'/paySuccess',
                //     query:{
                //         id:localStorage.orderId
                //     }
                // })
                return false;
            }
            if(sessionStorage.beforPath){
                //如果是从商品购买页面过来
                if(sessionStorage.beforPath=='goodsContent'){
                    this.source='buy';
                //如果是从购物车过来
                }else if(sessionStorage.beforPath=='shopCart'){
                    this.source='cart';
                //如果是从订单过来
                }else if(sessionStorage.beforPath=='order'||sessionStorage.beforPath=='orderDetail'){
                    this.source='order';
                }
            }else{
                //如果没有存路径，返回首页去
                this.$router.push({
                    path:'/'
                })
                return;
            }
            if(this.$route.query.id){//这个id就是buy_id
                let buy_id=this.$route.query.id;
                this.$axios.post(`/v1/goods/settlement?token=${sessionStorage.token}`,{
                    buy_id:buy_id,
                    source:this.source
                }).then((res)=>{
                    let data=res.data.data;
                    if(data.code===1000){
                        this.goodsList=data.goods_list;//商品列表
                        this.total=data.count_price;//总价
                        this.integral=data.integral;//可用积分
                        this.count=data.count;//总共多少件商品
                        if(sessionStorage.address){
                            this.address=JSON.parse(sessionStorage.address);
                        }else{
                            if(data.address){
                                this.address=data.address;
                            }
                        }
                        //计算价格
                        this.computedTotal();
                    }else if(data.code===1001){
                        setTimeout(() => {
                            this.$router.push({
                                path:'/'
                            })
                        }, 2000);
                    }
                })
            }else{
                //如果没有id，返回首页去
                this.$router.push({
                    path:'/'
                })
                return;
            }
        },
        //计算需支付金额
        computedTotal(){
            //计算需支付总额
            if(this.total<=this.integral){
                this.needToPay=0;
            }else{
                this.needToPay=this.total-this.integral;
            }
        },
        //返回上一页
        goBack() {
            if(sessionStorage.beforPath){
                if(sessionStorage.beforPath=='order'){
                    window.location.href =`${this.$config.api.public_chinese_url}/order?token=${sessionStorage.token}`;
                    // this.$router.push({
                    //     path:'/order'
                    // })
                }else if(sessionStorage.beforPath=='orderDetail'){
                    window.location.href =`${this.$config.api.public_chinese_url}/orderDetail?id=${this.$route.query.id}&token=${sessionStorage.token}`;
                    // this.$router.push({
                    //     path:`/orderDetail?id=${this.$route.query.id}`
                    // })
                }else if(sessionStorage.beforPath=='shopCart'){
                    window.location.href =`${this.$config.api.public_chinese_url}/shopCart?token=${sessionStorage.token}`;
                    // this.$router.push({
                    //     path:'/shopCart'
                    // })
                }else if(sessionStorage.beforPath=='goodsContent'){
                    window.location.href =`${this.$config.api.public_chinese_url}/goodsContent?id=${sessionStorage.goodsId}&token=${sessionStorage.token}`;
                    // this.$router.push({
                    //     path:'/goodsContent',
                    //     query:{
                    //         id:sessionStorage.goodsId
                    //     }
                    // })
                }else{
                    this.$router.push({
                        path:'/'
                    })
                }
            }else{
                this.$router.push({
                    path:'/'
                })
            }
        },
        //前往选择地址
        goAddress(){
            //判断是否有地址
            if(Object.keys(this.address).length === 0){
                //如果没有地址，直接跳转到添加地址页面
                this.$router.push({
                    path:'/addSite',
                    query:{
                        id:this.$route.query.id
                    }
                })
            }else{
                //如果有地址，跳往地址列表选择
                this.$router.push({
                    path:'/myAddress',
                    query:{
                        id:this.$route.query.id
                    }
                })
            }
        },
        //是否使用积分
        changeIntCheck(){
            this.isIntegral=!this.isIntegral;
            if(this.isIntegral){
                this.computedTotal();
            }else{
                this.needToPay=this.total;
            }
        },
        //选择支付方式
        checkPayType(i){
            this.payType=i;
        },
        //去支付
        goPay(){
            //判断是否有地址
            if(Object.keys(this.address).length === 0){
                this.$toast('请添加收货地址');
                return;
            }
            let buy_id=this.$route.query.id;//购买id
            let goods_ids=[];//商品id[{id:'123',num:'5'}]
            let is_integral=this.isIntegral?1:0;//是否使用积分支付 0：否 1：是
            let payment='';//支付方式
            //获取结算方式
            if(this.payType==0&&this.needToPay>0){
                payment='weixin';
                // this.$toast('此功能正在开发，请选择其他支付方式');
                // return;
            }else if(this.payType==1&&this.needToPay>0){
                payment='alipay';
            }else if(this.payType==2&&this.needToPay>0){
                payment='unionpay';
            }
            this.goodsList.forEach((item,index) => {
                goods_ids.push(item.id);
            });
            this.$axios.post(`/v1/pay/create?token=${sessionStorage.token}`,{
                source:this.source,
                goods_ids:goods_ids.join(','),
                buy_id:buy_id,
                address_id:this.address.id,
                remark:this.remark,
                is_integral:is_integral,
                payment:payment
            }).then((res)=>{
                this.$toast.loading({
                    message:'正在支付中...',
                    forbidClick: true,
                    loadingType: 'spinner'
                })
                let data=res.data.data;
                if(data.code===1000){
                    localStorage.orderId=data.transaction_id;
                    localStorage.token=sessionStorage.token;
                    //微信支付
                    if(payment=='weixin'){
                        let el = document.createElement('a');
                        document.body.appendChild(el);
                        el.href =data.mweb_url;
                        setTimeout(function() {
                            el.click();
                            document.body.removeChild(el);
                        }, 50);
                    //支付宝支付
                    }else if(payment=='alipay'){
                        const div = document.createElement('divform');
                        div.innerHTML = data.pay_info;
                        document.body.appendChild(div);
                        // document.forms[0].acceptCharset = "GBK";
                        //保持与支付宝默认编码格式一致，如果不一致将会出现：调试错误，请回到请求来源地，重新发起请求，错误代码 invalid-signature 错误原因: 验签出错，建议检查签名字符串或签名私钥与应用公钥是否匹配
                        document.forms[0].submit();
                    }else if(payment=='unionpay'){
                        const div = document.createElement('divform');
                        div.innerHTML = data.pay_info;
                        document.body.appendChild(div);
                        // document.forms[0].acceptCharset = "GBK";
                        //保持与支付宝默认编码格式一致，如果不一致将会出现：调试错误，请回到请求来源地，重新发起请求，错误代码 invalid-signature 错误原因: 验签出错，建议检查签名字符串或签名私钥与应用公钥是否匹配
                        document.forms[0].submit();
                    }
                    setTimeout(() => {
                        window.location.href =`${this.$config.api.public_chinese_url}/paySuccess?id=${data.transaction_id}&token=${sessionStorage.token}`;
                        // this.$router.push({
                        //     path:'/paySuccess',
                        //     query:{
                        //         id:data.transaction_id
                        //     }
                        // })
                    }, 2000);
                }
            })
        }
    },
}
</script>