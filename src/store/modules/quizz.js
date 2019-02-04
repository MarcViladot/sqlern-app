import exercises from '../../api/quizzs'
import quizzs from '../../api/quizzs';

const state = {}

const getters = {
}

const actions = {
    create({ commit, dispatch }, data) {
        quizzs.create(data).then(res => {
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