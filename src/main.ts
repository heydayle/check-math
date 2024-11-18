//@ts-nocheck
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import vue3GoogleLogin from 'vue3-google-login'

import App from './App.vue'
import router from './router'

const app = createApp(App)
if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
  window.document.addEventListener('touchmove', function(event) {
    event = event?.originalEvent || event;
    if(event?.scale !== 1) {
      event.preventDefault();
    }
  }, {passive: false});
}
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.p-dark',
    }
  }
});
app.use(vue3GoogleLogin, {
  clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
})
app.use(createPinia())
app.use(router)

app.mount('#app')
