
import { createApp } from "vue";
import { createPinia } from 'pinia'
import App from "./App.vue";

import "./assets/main.css";

import "primeflex/primeflex.css";
import "primevue/resources/themes/aura-light-green/theme.css";
import "primeicons/primeicons.css";

import PrimeVue from "primevue/config";

const pinia = createPinia()
const app = createApp(App);
app.use(PrimeVue);
app.use(pinia)

// createApp(App).mount("#app");
app.mount('#app')
