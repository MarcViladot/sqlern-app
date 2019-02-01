import topics from '../../api/topics'

const state = {
    all: []
}

const getters = {
}

const actions = {
    getAll({ commit }) {
        topics.getAll().then(res => {
            commit('setTopics', res)
        })
            .catch(error => console.log(error.response))
    }
}

const mutations = {
    setTopics(state, topics) {
        state.all = topics;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}