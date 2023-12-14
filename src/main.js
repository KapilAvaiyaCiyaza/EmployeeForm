import './assets/main.css'
import '@formkit/themes/genesis'

import { createApp } from 'vue'
import { plugin, defaultConfig } from '@formkit/vue'
import config from './formkit.config'
import router from "./routes"
import App from './App.vue'

const app = createApp(App);

app.use(plugin, defaultConfig(config), router)
app.use(router)

app.mount('#app')
