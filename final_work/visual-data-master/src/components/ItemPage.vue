<template>
  <div class="item">
    <!-- 设置插槽 -->
    <slot></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
.item {
    height: 8.3rem;
    border: 1px solid rgba(255, 255, 255, 0.829);
    margin: .25rem;
    background-color: rgba(5, 5, 5, 0.11);
}
</style>