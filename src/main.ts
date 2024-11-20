import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

import App from './App.vue'
import router from './router'

const app = createApp(App)
document.addEventListener('gesturestart', function (e) {
  e.preventDefault();
});
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.app-dark',
    }
  }
});
app.use(createPinia())
app.use(router)

app.mount('#app')
