import users from '../../api/users'
import API from '../../api/api'

const state = {
    isLoggedIn: !!localStorage.getItem('currentUserToken'),
    currentUser: undefined,
    error: false
}

const getters = {
    getCurrentUser: (state) => {
        return state.currentUser
    }
}

const actions = {
    login({ dispatch, commit }, credentials) {
        users.login(credentials).then(res => {
            localStorage.setItem('currentUserToken', res.auth_token)
            API.defaults.headers['Authorization'] = res.auth_token;
            dispatch('setCurrentUser')
            commit('setError', false)
        })
            .catch(error => {
                commit('setError', true)
            })
    },
    logout({ commit }) {
        localStorage.removeItem('currentUserToken')
        API.defaults.headers['Authorization'] = "";
        commit('logout')
    },
    setCurrentUser({ commit }) {
        return new Promise((resolve, reject) => {
            users.getCurrentUser().then(user => {
                commit('login', user)
                resolve()
            })
                .catch(error => console.log(error.response))
        })
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
    },
    setError(state, bool) {
        state.error = bool;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}