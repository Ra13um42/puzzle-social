import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Text from './components/Text.vue' 


const app = createApp(App)

app.use(router)

app.component("Text", Text);

app.mount('#app')
