import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引用lib-flexible插件
import 'lib-flexible/flexible.js'

import '../node_modules/echarts/map/js/world.js'
createApp(App).use(store).use(router).mount('#app')
