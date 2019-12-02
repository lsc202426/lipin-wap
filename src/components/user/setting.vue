<template>
    <div class="setting">
        <!--头部-->
        <nav-bar title="设置" url="/user" :border=border :leftArrow=leftArrow></nav-bar>
        <!--内容-->
        <div class="setting-content containerView-main">
            <!-- <div class="field-item f-bgf f-bdb">
                <div class="field-tip">账户ID</div>
                <div class="field-tail">
                    {{data.id}}
                </div>
            </div> -->
            <div class="field-item f-bgf f-bdb f-mgb">
                <div class="field-tip">头像</div>
                <div class="field-tail">
                    <div class="field-tail-txt user-head" v-if="images==''"></div>
                    <div class="field-tail-txt user-head" :style="{ backgroundImage: 'url(' + images + ')' }" v-else></div>
                    <!-- <div class="icon-r"></div> -->
                </div>
            </div>
            <!-- <input accept="image/*" @change="toBase64($event)" class="change-head" type="file"> -->
            <!-- <div class="field-item f-bgf f-bdb f-mgb">
                <div class="field-tip">实名信息</div>
                <div class="field-tail">
                    <div class="field-tail-txt">未实名</div>
                    <div class="icon-r"></div>
                </div>
            </div> -->
            <div class="field-item f-bgf f-bdb" @click="changePhone">
                <div class="field-tip">修改手机号</div>
                <div class="field-tail">
                    <div class="field-tail-txt">{{data.mobile_phone}}</div>
                    <div class="icon-r"></div>
                </div>
            </div>
            <div class="field-item f-bgf f-bdb f-mgb" @click="changePass">
                <div class="field-tip">修改密码</div>
                <div class="field-tail">
                    <div class="icon-r"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'setting',
    data() {
        return {
            border: true,
            leftArrow: true,
            images:'',
            data:{},//页面数据
        }
    },
    created () {
        this.init();//初始化
    },
    methods: {
        //初始化获取设置数据
        init(){
            this.$axios.post(`/v1/home/setting?token=${sessionStorage.token}`).then((res)=>{
                let data=res.data.data;
                if(data.code===1000){
                    this.data=data.info;
                }
            })
        },
        //修改手机号
        changePhone(){
            this.$router.push({
                path:'/modifyPhone'
            })
        },
        //修改密码
        changePass(){
            this.$router.push({
                path:'/modifyPass'
            })
        },
        //修改头像
        toBase64(e) {
            var _this = this;
            var files = e.target.files[0];
            var reader = new FileReader();
            reader.readAsDataURL(files);
            reader.onload = function() {
                var imgcode = this.result.replace(/^data:image\/(jpeg|png|gif|jpg|bmp);base64,/, '');
                _this.upload(files.name, imgcode);
            };
        },
        upload(n, imgcode) {
            var _this = this;
            _this.$axios
                .post('index.php?c=App&a=setPortrait', {
                    filename: n,
                    portrait: imgcode,
                })
                .then(function(response) {
                    _this.images = response.data.content.url;
                    Toast({
                        message: '更换成功',
                        duration: 3000,
                    });
                })
                .catch(function(error) {});
        },
    },
}
</script>