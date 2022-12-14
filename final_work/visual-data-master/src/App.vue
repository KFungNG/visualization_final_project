<template>
  <router-view/>
</template>

<script>
import { provide } from "vue"
import * as echarts from "echarts"
import axios from "axios"
// 设置axios基准路径
axios.defaults.baseURL = "http://localhost:8888"
export default {
  setup() {
    provide("echarts", echarts)
    provide("axios", axios)
  }
}
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  background: url("~@/assets/bg3.gif") top center no-repeat;
  
  background-size: 100% 100%;
  width: 100%;
  // height: 100%;
  min-height: 100vh;
}
</style>
