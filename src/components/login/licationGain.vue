<template>
    <div class="licationGain integral f-bgf">
        <!--头部-->
        <nav-bar title="入驻供货商" url="/login" :border=border :leftArrow=leftArrow></nav-bar>
        <!--内容-->
        <div class="gain-content containerView-main">
            <div class="gain-content-box">
                <img class="banner" :src="banner" alt="">
                <div class="gain-item">
                    <div class="title">对接刚需群体</div>
                    <div class="text">获赠积分的用户，仅限平台内消费，对礼品有刚性需求。</div>
                </div>
                <div class="gain-item">
                    <div class="title">对接企业级采购资源</div>
                    <div class="text">积分用户为企业高管或负责人，有利于您对接企业类的采购机会。</div>
                </div>
                <div class="gain-item">
                    <div class="title">不收取任何费用</div>
                    <div class="text">进驻的品牌商家无需缴纳任何费用，满足条件即可进驻。</div>
                </div>
                <div class="gain-item">
                    <div class="title">提升品牌曝光率</div>
                    <div class="text">平台定位于礼品回馈，用户习惯浏览全部礼品后再作选择，这使品牌曝光的机率大大增加。</div>
                </div>
                <div class="gain-item f-bdb">
                    <div class="title">塑造质优品牌形象</div>
                    <div class="text">入驻礼品平台条件极为严苛，不仅品牌真实，质量合格还要无失信记录的商家方可进驻。</div>
                </div>
                <div class="gain-tarm f-bdb">
                    <div class="title">入驻条件</div>
                    <div class="text">
                        <p>1、提供入驻平台商品的商标注册证、商标许可合同或“.商标”域名；</p>
                        <p>2、提供主体资质证明文件，如：营业执照/组织机构代码证/个体工商营业执照；</p>
                        <p>3、无存在《经营异常名录》、《严重违法失信企业》等相关记录。</p>
                    </div>
                </div>
                <div class="gain-contact">
                    <p>如需了解更多请联系：020-62944090，张小姐</p>
                    <p>邮箱：grace.zhang@tdnnic.org</p>
                </div>
                <!--确定按钮-->
                <div class="lication-btn">
                    <div class="gain-tips"><div @click.stop="changeCheck" class="icon-checkbox" :class="{'icon-checkbox-active':isCheck}"></div>我已阅读并同意<span @click.stop="showPopup" class="price">《供货商须知》</span>并遵守相关规定</div>
                    <div class="big-btn" @click="onSubmit">立即申请</div>
                </div>
            </div>
        </div>
        <van-popup v-model="show" position="bottom" close-icon-position>
            <div class="popup-top">
                供货商须知
                <div class="popup-close" @click.stop="closePopup"></div>
            </div>
            <div>
                <p class="title">平台上架销售商品或服务的质量要求：</p>
                <p>1、供货方保证所提供的产品/服务是由供货商自营生产或提供，或已取得合法代理资格的产品/服务；</p>
                <p>2、涉及国家法律法规或行业规范需提供产品质量证明文件的，供货商须提供对应资质文件，如“食品生产许可证、”“3C认证”、“质量检测报告”等；</p>
                <p>3、供货商所提供的商品应在合理的有效期内，剩余保质期必须在该商品整个保质期限的70%以上。</p>
                <p>4、供货商上架到平台销售的商品/服务品类数量不限，但需提供真实的供货数量。</p>
            </div>
            <div>
                <p class="title">商品价格、采购方式与结算方式</p>
                <p>1、平台入驻不收取任何费用，但供货商在该平台所提供的商品或服务价格需低于或等于市场上的售价，若出现高于市场上的折扣价，平台方有权取消该供货商的进驻或拒绝支付相关的购货款项；</p>
                <p>2、供货商所提供商品/服务的市场售价或与结算价发生变动、可供产品/服务数量或品质或型号发生变化，应提前5个工作日以书面或邮件的形式通知，但供货商需保证调价/调货之前发出的釆购单依然有效，并按之前约定采购价结算；</p>
                <p>3、供货商收到乙方采购需求,需在二个工作日内，依据平台釆购清单上的产品及数量，收货人名称及送货地址，向指定收货人及地址发货，相关物流费用由供货商承担；</p>
                <p>4、收货人收到产品/服务并确认收货后，订单采购款于次月的5日统一结算，供货商收到货款后应开具发票；</p>
            </div>
            <div>
                <p class="title">退/换货的规定</p>
                <p>供货商承诺如平台采购需求的收货人因产品/服务质量、型号等问题向平台方申请产品/服务退换，供货商承诺接到平台要求重新发货的通知并收到收货人的退货后，于二个工作日内向收货人重新发货。重新发货的物流费用由供货商负责，如供货商拒绝重新发货，平台方可以拒绝支付该产品/服务的货款。</p>
                <p>1、自收到更换的商品起，供货商于二个工作日内向收货人重新发货，如因供货商发货错误或质量问题导致的退换货，相关物流费用由供货商承担；如因收货人原因导致的退换货，相关物流费用由收货人承担；</p>
                <p>2、用户签收商品7天后，或存在影响商品二次流通的情况下，平台方不予接受收货人提出的退换货申请。</p>
            </div>
            <div>
                <p class="title">商品上架规则：</p>
                <p>1、平台方提供“供货商后台管理系统”由供货商自行上架商品/服务，上架时需添加项目为：产品/服务名称、规格、型号、产品详情介绍图、产品图片、最低市场价、双方商议后的结算价等相关信息，由平台方审核无误后点击确认上架；</p>
                <p>2、商品库存数量为0时，商品将无法在线购买，于供货商后台管理系统补充库存，经平台方审核后方可继续上架；</p>
            </div>
            <div>
                <p class="title">商品下架规则：</p>
                <p>1、经平台方核查发现供货商存在违反平台规则的行为，如：商品或服务的质量要求，商品价格、采购方式及结算方式，退/换货的规定等；</p>
                <p>2、经平台方核查发现供货商所存在提供虚假资质或者授权的行为；</p>
                <p>3、商品/服务的描述与用户收到的商品/服务严重不相符；</p>
                <p>4、提供的产品或服务存在侵害他人的知识产权；</p>
                <p>5、用户重大投诉，包含不限于：商品或服务质量问题、欺诈问题（例如：虚假资质、假货、水货等）、诚信问题（例如：虚价配货、虚高售价等行为）、售后及服务品质问题;</p>
                <p>6、存在其他违反国家法律、法规或其他违反礼品平台规则等行为。</p>
            </div>
        </van-popup>
    </div>
</template>
<script>
export default {
    name:'licationGain',
    data() {
        return {
            border:true,
            leftArrow:true,
            isCheck:true,
            banner:require('@/assets/images/banner_icon.png'),
            show:false,
        }
    },
    methods: {
        changeCheck(){
            this.isCheck=!this.isCheck;
        },
        //前往申请成为供应商页面
        onSubmit(){
            if(!this.isCheck){
                this.$toast('请先阅读供货商须知');
                return false;
            }
            this.$router.push({
                path:'licationSettle'
            })
        },
        //供货商须知
        showPopup(){
            this.show=true;
        },
        closePopup(){
            this.show=false;
        }
    },
}
</script>