import exercises from '../../api/exercises'

const state = {}

const getters = {
}

const actions = {
    create({ commit, dispatch }, data) {
        exercises
            .create(data)
            .then(res => {
                console.log(res);
            })
            .catch(error => console.log(error));
    }
}

const mutations = {
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}