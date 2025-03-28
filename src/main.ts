/** css文件全局导入 */
// import './assets/main.css'
import 'normalize.css'
import './assets/css/index.less'

// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import router from './router'
import pinia from './store'

import '@/permission'

import { createApp } from 'vue'
import App from './App.vue'
import registerIcons from './global/register-icons'

const app = createApp(App)
app.use(registerIcons)
app.use(router)
app.use(pinia)
// app.use(ElementPlus)
app.mount('#app')
