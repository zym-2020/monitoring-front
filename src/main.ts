import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import * as Icons from '@element-plus/icons'
import 'element-plus/dist/index.css'
import locale from 'element-plus/lib/locale/lang/zh-cn'

const app = createApp(App)
Object.keys(Icons).forEach(key => {
    app.component(key, Icons[key as keyof typeof Icons])
})
app.use(ElementPlus, { locale })
app.use(store).use(router).mount('#app')
