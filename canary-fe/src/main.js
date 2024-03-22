
import { createApp } from "vue";
import App from "./App.vue";

import "./assets/main.css";

import "primeflex/primeflex.css";
import "primevue/resources/themes/aura-light-green/theme.css";
// import "primevue/resources/primevue.min.css"; /* Deprecated */
import "primeicons/primeicons.css";

// import 'primevue/resources/themes/lara-dark-teal/theme.css'


import PrimeVue from "primevue/config";

const app = createApp(App);
app.use(PrimeVue);

// createApp(App).mount("#app");
app.mount('#app')
