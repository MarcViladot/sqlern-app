import Vue from 'vue'
import VueRouter from 'vue-router'

import HelloWorld from '../components/HelloWorld.vue'
import Profile from '../components/user/Profile.vue'
import SearchQuizzs from '../components/search/SearchQuizzs.vue'

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    routes: [
      { path: '/', component: HelloWorld },
      { path: '/profile', component: Profile },
      { path: '/search/quizzs', component: SearchQuizzs}
    ]
})
