import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import store from './store'
import router from './router'
import Vuetify from 'vuetify'
import moment from 'moment'
import VueCodemirror from 'vue-codemirror'
import VueSweetalert2 from 'vue-sweetalert2';

Vue.config.productionTip = false

Vue.prototype.moment = moment

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

var mixin = {
  methods: {
    error() {
      this.$swal({
        title: "Ops!",
        text: "An unexpected error has occurred",
        type: "error"
      })
    }
  }
}

new Vue({
  mixins: [mixin],
  store,
  router,
  components: { App },
  template: '<App />'
}).$mount('#app')
