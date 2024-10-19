import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Text from './components/language/Text.vue' 
import Button from './components/Button.vue' 
import Link from './components/Link.vue' 

const app = createApp(App)

app.use(router)

app.component("Text", Text)
app.component("Button", Button)
app.component("Link", Link)

app.mount('#app')
