import './style.css'
import App from './App.vue'
import 'lib-flexible/flexible'
import Vue from 'vue'
import router  from './router'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createApp } from 'vue';
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.use(router)
.use(ElementPlus, { size: 'small', zIndex: 3000 })
.mount('#app')
