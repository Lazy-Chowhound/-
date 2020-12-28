import Vue from 'vue'
import App from './App.vue'

import ElementUI from "element-ui"
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/base.css';
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';

import axios from 'axios';
import VueRouter from 'vue-router';
import routes from "@/router";




Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.prototype.$axios = axios;
Vue.component(CollapseTransition.name, CollapseTransition)

const router = new VueRouter({
    routes
})

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
