import "./assets/main.css";
import vue3GoogleLogin from "vue3-google-login";
import { createApp } from "vue";
import { createPinia } from "pinia";
import { markRaw } from "vue";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

app.use(vue3GoogleLogin, {
  clientId:
    "608042006497-hccsgcpe717ftfrl1s45aed6hhta1lsl.apps.googleusercontent.com",
});

pinia.use(({ store }) => {
  store.router = markRaw(router);
});

app.mount("#app");
