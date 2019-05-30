import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

import HelloWorld from '../components/HelloWorld.vue'
import Profile from '../components/user/Profile.vue'
import SearchQuizzs from '../components/search/SearchQuizzs.vue'
import QuizzDetail from '../components/quizzs/QuizzDetail.vue'
import AnswerQuizzForm from '../components/quizzs/AnswerQuizzForm.vue'
import AnsweredQuizz from '../components/quizzs/AnsweredQuizz.vue'
import EditQuizzForm from '../components/quizzs/EditQuizzForm.vue'
import NewExerciseForm from '../components/exercises/NewExerciseForm.vue'
import ExercisesSet from '../components/exercises/ExercisesSet.vue'
import NewQuizzForm from '../components/quizzs/NewQuizzForm.vue'
import GQuizzDetails from '../components/quizzs/GeneratedQuizzDetails.vue'
import NewTablesForm from '../components/tables/NewTablesForm.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: HelloWorld },
    { path: '/profile', component: Profile },
    {
      path: '/search/quizzs',
      component: SearchQuizzs,
      meta: { isTeacher: true }
    },
    {
      path: '/quizzs/new',
      component: NewQuizzForm,
      meta: { isTeacher: true }
    },
    {
      path: '/quizzs/:id',
      component: QuizzDetail,
      meta: { isTeacher: true }
    },
    {
      path: '/quizzs/test/:code',
      component: AnswerQuizzForm,
      meta: { isStudent: true }
    },
    { path: '/quizzs/answered/:id', component: AnsweredQuizz },
    {
      path: '/quizzs/edit/:id',
      component: EditQuizzForm,
      meta: { isTeacher: true }
    },
    {
      path: '/gquizzs/:code',
      component: GQuizzDetails,
      meta: { isTeacher: true }
    },
    {
      path: '/exercises/new',
      component: NewExerciseForm,
      meta: { isTeacher: true }
    },
    {
      path: '/exercises/set',
      component: ExercisesSet,
      meta: { isStudent: true }
    },
    {
      path: '/tables/new',
      component: NewTablesForm,
      meta: { isTeacher: true }
    }
  ]
})


/* router.beforeResolve((to, from, next) => {
  if (to.matched.some(record => record.meta.isTeacher)) {
    if (store.state.user.currentUser.role === 0) {
      next({
        path: '/',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.isStudent)) {
    if (store.state.user.currentUser.role === 1) {
      next({
        path: '/',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
}) */

export default router;
