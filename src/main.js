import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/icon/iconfont.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import tinymce from 'tinymce'
import VueTinymce from '@packy-tang/vue-tinymce'

Vue.prototype.$tinymce = tinymce // 将全局tinymce对象指向给Vue作用域下
Vue.use(VueTinymce)


Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
