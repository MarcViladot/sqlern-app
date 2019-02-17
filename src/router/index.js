import Vue from 'vue'
import VueRouter from 'vue-router'

import HelloWorld from '../components/HelloWorld.vue'
import Profile from '../components/user/Profile.vue'
import SearchQuizzs from '../components/search/SearchQuizzs.vue'
import QuizzDetail from '../components/quizzs/QuizzDetail.vue'
import AnswerQuizzForm from '../components/quizzs/AnswerQuizzForm.vue'
import AnsweredQuizz from '../components/quizzs/AnsweredQuizz.vue'
import NewExerciseForm from '../components/exercises/NewExerciseForm.vue'
import NewQuizzForm from '../components/quizzs/NewQuizzForm.vue'
import NewModelForm from '../components/conceptualmodels/NewModelForm.vue'
import NewTablesForm from '../components/tables/NewTablesForm.vue'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: HelloWorld },
    { path: '/profile', component: Profile },
    { path: '/search/quizzs', component: SearchQuizzs },

    { path: '/quizzs/new', component: NewQuizzForm },
    { path: '/quizzs/:id', component: QuizzDetail },
    { path: '/quizzs/test/:code', component: AnswerQuizzForm },
    { path: '/quizzs/answered/:id', component: AnsweredQuizz },

    { path: '/exercises/new', component: NewExerciseForm },

    { path: '/tables/new', component: NewTablesForm }
  ]
})
