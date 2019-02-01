import Vue from 'vue'
import Vuex from 'vuex'

//Modules
import user from './modules/user'
import exercise from './modules/exercise'
import topic from './modules/topic'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user,
        exercise,
        topic
    }
})