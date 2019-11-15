<template>
    <div class="setting">
        <!--头部-->
        <nav-bar title="设置" :border=border :leftArrow=leftArrow></nav-bar>
        <!--内容-->
        <div class="setting-content">
            <div class="field-item f-bgf f-bdb">
                <div class="field-tip">账户ID</div>
                <div class="field-tail">
                    6892136264164
                </div>
            </div>
            <div class="field-item f-bgf f-bdb f-mgb">
                <div class="field-tip">头像</div>
                <div class="field-tail">
                    <div class="field-tail-txt user-head"></div>
                    <div class="icon-r"></div>
                </div>
            </div>
            <!-- <div class="field-item f-bgf f-bdb f-mgb">
                <div class="field-tip">实名信息</div>
                <div class="field-tail">
                    <div class="field-tail-txt">未实名</div>
                    <div class="icon-r"></div>
                </div>
            </div> -->
            <div class="field-item f-bgf f-bdb">
                <div class="field-tip">修改手机号</div>
                <div class="field-tail">
                    <div class="field-tail-txt">13711323876</div>
                    <div class="icon-r"></div>
                </div>
            </div>
            <div class="field-item f-bgf f-bdb f-mgb">
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
        }
    },
}
</script>