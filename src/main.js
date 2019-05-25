import Vue from "vue";
import "vuetify/dist/vuetify.min.css";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueResource from "vue-resource";
import Vuetify from "vuetify";
import VeeValidate from "vee-validate";
import VueCookies from "vue-cookies";

Vue.use(VueCookies);
Vue.use(VeeValidate);
Vue.use(Vuetify);
Vue.use(VueResource);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
