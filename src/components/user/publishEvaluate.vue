<template>
    <div class="publishEvaluate">
        <!--头部-->
        <nav-bar title="发表评价" :border=border :leftArrow=leftArrow></nav-bar>
        <!--内容-->
        <div class="publish-evaluate-con containerView-main">
            <div class="publish-page f-bgf">
                <div class="page-goods">
                    <div class="page-goods-img">
                        <img v-lazy="data.cover" alt="">
                    </div>
                    <div class="page-goods-text">
                        <div class="title">{{data.title}}</div>
                        <div class="specs">{{data.sp_value_name}}</div>
                    </div>
                </div>
                <div class="evaluate-num f-bdb">
                    <span>总体</span>
                    <van-rate v-model="num" color="#FF6A00" void-icon="star" size="0.6rem" gutter="0.06rem" void-color="#D9D9D9" />
                </div>
                <div class="evaluate-text">
                    <textarea name="" v-model.trim="content" placeholder="分享你的购物心得" cols="30" rows="10"></textarea>
                </div>
                <div class="upload-images">
                    <van-uploader v-model="fileList" :before-delete="beforeDelete" :after-read="afterRead" multiple :max-count="9" />
                </div>
            </div>
        </div>
        <!--底部-->
        <div class="publish-bottom f-bgf">
            <div class="anonymous" @click.stop="changeCheck">
                <div class="icon-checkbox" :class="{'icon-checkbox-active':ischeck}"></div>
                <div>匿名评价</div>
            </div>
            <div class="publish-bottom-btn f-bgc2" @click.stop="publish">发布评价</div>
        </div>
    </div>
</template>
<script>
import lrz from 'lrz';
export default {
    name:"publishEvaluate",
    data() {
        return {
            border:false,
            leftArrow:true,
            num: 5,//默认评价分数
            fileList:[],//预览图片
            ischeck:false,//是否匿名
            data:{},//商品信息数据
            images:[],//guid数组
            content:"",//评论内容
        }
    },
    watch: {
        fileList:function(val) {
            //console.log(val);
        },
        images:function(val){
            //console.log(val);
        }
    },
    created () {
        this.init();//初始化获取评价数据
    },
    methods: {
        //初始化
        init(){
            this.$axios.post(`/v1/evaluate/publishDetail?token=${sessionStorage.token}`,{
                id:this.$route.query.id
            }).then((res)=>{
                let data=res.data.data;
                if (data.code === 1000) {
                    this.data=data.info;
                }
            })
        },
        //图片上传之前
        afterRead(file){
            let _this=this;
            let filename=file.file.name;//文件名
            let fileBaseStr=file.content.replace(/^data:image\/(jpeg|png|gif|jpg|bmp);base64,/, '');//base64编码；
            let fileSuffix=file.file.type.split('/')[1];//文件类型;
            lrz(file.file)
                .then(function (rst) {
                    // 处理成功会执行
                    fileBaseStr=rst.base64.replace(/^data:image\/(jpeg|png|gif|jpg|bmp);base64,/, '');
                    _this.upLoadImg(filename,fileBaseStr,fileSuffix);
                })
                .catch(function (err) {
                    // 处理失败会执行
                    _this.upLoadImg(filename,fileBaseStr,fileSuffix);
                })
                .always(function () {
                    // 不管是成功失败，都会执行
            });
            
        },
        upLoadImg(name,BaseStr,Suffix){
            this.$axios.post(`/v1/home/uploadImage?token=${sessionStorage.token}`,{
                filename:name,
                fileBaseStr:BaseStr,
                fileSuffix:Suffix
            }).then((res)=>{
                let data=res.data.data;
                if(data.code===1000){
                    this.images.push(data.guid);
                }
            })
        },
        //图片删除
        beforeDelete(file,detail){
            this.images.splice(detail.index, 1);
            return true;
        },
        //是否匿名
        changeCheck() {
            this.ischeck=!this.ischeck;
        },
        //发布评论
        publish(){
            //是否匿名赋值
            let isanonymous=0;
            if(this.ischeck){
                isanonymous=1;
            }
            this.$axios.post(`/v1/evaluate/publish?token=${sessionStorage.token}`,{
                id:this.$route.query.id,
                scores:this.num,
                content:this.content,
                isanonymous:isanonymous,
                image:this.images
            }).then((res)=>{
                let data=res.data.data;
                if(data.code===1000){
                    this.$router.push({
                        path:'/evaluateSuccess',
                    })
                }
            })
        },
    },
}
</script>