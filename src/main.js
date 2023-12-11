import './assets/main.css'
import '@formkit/themes/genesis'

import { createApp } from 'vue'
import { plugin, defaultConfig } from '@formkit/vue'
import config from './formkit.config'
import App from './App.vue'


createApp(App).use(plugin, defaultConfig(config)).mount('#app')
