<template>
    <div class="addSite">
        <!--头部-->
        <nav-bar title="新增地址" :border=border :leftArrow=leftArrow></nav-bar>
        <!--内容-->
        <div class="addSite-content">
            <div class="field-item f-bgf f-bdb">
                <div class="field-tip">联系人：</div>
                <input class="field-input" v-model.trim="name" type="text" placeholder="请填写姓名">
                <div class="field-tail field-mark">
                    <span @click="changeGender(item.name)" :class="{'active':item.name==genderMark}" v-for="(item,index) in gender" :key="index">{{item.name}}</span>
                </div>
            </div>
            <div class="field-item f-bgf f-bdb">
                <div class="field-tip">电话：</div>
                <input class="field-input" v-model.trim="phone" type="text" placeholder="请填写收货人电话">
                <div class="field-tail icon-phone"></div>
            </div>
            <div class="field-item f-bgf f-bdb">
                <div class="field-tip">地区：</div>
                <div class="field-input" :class="{'field-input-gay':address=='请选择地区'}" @click="showPopup">{{address}}</div>
                <!-- <inpu @click="showPopup" disabled v-model.trim="address" type="text" placeholder="请选择地区"> -->
                <div class="field-tail">
                    <div class="icon-r"></div>
                </div>
            </div>
            <div class="field-item f-bgf f-bdb">
                <div class="field-tip">详细地址：</div>
                <input class="field-input" v-model.trim="addressDetail" type="text" placeholder="请填写详细地址">
            </div>
            <div class="field-item f-bgf f-mgb f-bdb">
                <div class="field-tip">标签：</div>
                <div class="field-mark df-field-mark">
                    <span @click="changeMark(item.name)" :class="{'active':item.name==mark}" v-for="(item,index) in marks" :key="index">{{item.name}}</span>
                </div>
            </div>
        </div>
        <!--确定按钮-->
        <div class="addSite-btn">
            <div class="big-btn" @click="onSubmit">确定</div>
        </div>
        <!--地址弹出层-->
        <van-popup v-model="show" position="bottom">
            <van-area :area-list="areaList" @confirm="confirm" @cancel="cancel" />
        </van-popup>
    </div>
</template>
<script>
import areaList from '@/assets/js/areaList.js'
export default {
    name:'addSite',
    data() {
        return {
            border: true,
            leftArrow:true,
            name:'',//联系人
            phone:'',//联系电话
            address:'请选择地区',//地址
            addressDetail:'',//详细地址
            subAddress:'',//要提交的地址
            mark:'家',//标签
            genderMark:'先生',//性别
            marks:[
                {name:'家'},
                {name:'公司'},
                {name:'学校'}
            ],
            gender:[
                {name:'先生'},
                {name:'女士'}
            ],
            show:false,
            areaList:areaList
        }
    },
    created () {
        
    },
    methods: {
        //修改性别
        changeGender(name) {
            this.genderMark=name;
        },
        //修改标签
        changeMark(name){
            this.mark=name;
        },
        //显示地址弹出层
        showPopup(){
            this.show=true;
        },
        //选择地址完成
        confirm(val){
            let list=val.map((item,index)=>{
                return item.name;
            })
            this.address=list.join('-');
            this.subAddress=list.join('');
            this.show=false;
        },
        //取消选择地址
        cancel(){
            this.show=false;
        },
        //提交
        onSubmit(){
            let textTips="";
            let regPhone = /^1(3|4|5|6|7|8|9)\d{9}$/;
            if(!this.name){
                textTips="请填写姓名";
            }else if(!this.phone){
                textTips="请填写手机号码";
            }else if(!regPhone.test(this.phone)){
                textTips="请填写正确的手机号码";
            }else if(this.address=='请选择地区'){
                textTips="请选择地区";
            }else if(!this.addressDetail){
                textTips="请填写详细地址";
            }
            if(textTips){
                this.$toast(textTips);
                return;
            }
            let address=this.subAddress+this.addressDetail;
            this.$axios.post('/v1/home/saveAddress',{
                name:this.name,
                gender:this.genderMark,
                cellphone:this.phone,
                address:address,
                label:this.mark
            }).then((res)=>{
                let data=res.data.data;
                if(data.code===1000){
                    this.$toast({
                        message:data.msg,
                        forbidClick:true
                    });
                    setTimeout(() => {
                        //判断是否从结算页面直接过来的
                        if(this.$route.query.id){
                            //如果是，直接回到结算页面
                            this.$router.push({
                                path:'/settle',
                                query:{
                                    id:this.$route.query.id
                                }
                            })
                        }else{
                            //如果不是，直接前往地址列表
                            this.$router.push({
                                path:'/myAddress'
                            })
                        }
                    }, 2000);
                }
            })
        },
    },
}
</script>