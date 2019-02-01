import users from '../../api/users'
import API from '../../api/api'

const state = {
    isLoggedIn: !!localStorage.getItem('currentUserToken'),
    currentUser: undefined
}

const getters = {
}

const actions = {
    login({ dispatch }, credentials) {
        users.login(credentials).then(res => {
            localStorage.setItem('currentUserToken', res.auth_token)
            API.defaults.headers['Authorization'] = res.auth_token;
            dispatch('setCurrentUser')
        })
            .catch(error => console.log(error))
    },
    logout({ commit }) {
        localStorage.removeItem('currentUserToken')
        API.defaults.headers['Authorization'] = "";
        commit('logout')
    },
    setCurrentUser({ commit }) {
        users.getCurrentUser().then(user => {
            commit('login', user)
        })
            .catch(error => console.log(error.response))
    }
}

const mutations = {
    login(state, user) {
        state.isLoggedIn = true;
        state.currentUser = user;
    },
    logout(state) {
        state.isLoggedIn = false;
        state.currentUser = undefined;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}