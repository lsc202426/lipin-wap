<template>
    <div class="noData">
        <div class="no-data-text">
            {{text}}
        </div>
        <slot></slot>
    </div>
</template>
<script>
export default {
    props: {
        text: {
            type: String,
            default: '暂无数据'
        },
    },
}
</script>