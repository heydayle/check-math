import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import vue3GoogleLogin from 'vue3-google-login'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.app',
    }
  }
});
app.use(vue3GoogleLogin, {
  clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
})
app.use(createPinia())
app.use(router)

app.mount('#app')
