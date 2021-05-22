import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import { time } from "./assets/time"
import * as API from "./api"

const app = createApp(App)
app.use(store).use(router).use(ElementPlus).mount('#app')
app.config.globalProperties.$time = time
app.config.globalProperties.$API = API
