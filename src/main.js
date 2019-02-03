import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import store from './store'
import router from './router'
import Vuetify from 'vuetify'
import VueCodemirror from 'vue-codemirror'
import VueSweetalert2 from 'vue-sweetalert2';

Vue.config.productionTip = false

Vue.use(Vuetify, {
  theme: {
    primary: '#009688',
    secondary: '#3F51B5',
    accent: '#cacaca',
    error: '#FF5252'
  }
})
Vue.use(router)

import 'codemirror/lib/codemirror.css'
Vue.use(VueCodemirror)

Vue.use(VueSweetalert2, {
  confirmButtonColor: '#009688',
  cancelButtonColor: '#cacaca'
})

new Vue({
  store,
  router,
  components: { App },
  template: '<App />'
}).$mount('#app')
