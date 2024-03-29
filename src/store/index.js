import Vue from 'vue'
import Vuex from 'vuex'

//Modules
import user from './modules/user'
import exercise from './modules/exercise'
import topic from './modules/topic'
import quizz from './modules/quizz'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        user,
        exercise,
        topic,
        quizz
    }
})

export default store;