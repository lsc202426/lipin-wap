<template>
    <div class="primary-box">
        <div class="primary-text">
            <div>预选积分</div>
            <div class="primary-num">{{primary}}分</div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        primary: {
            default: 0
        },
    },
}
</script>