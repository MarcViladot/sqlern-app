import exercises from '../../api/exercises'
import hints from '../../api/hints'

const state = {
    set: []
}

const getters = {
}

const actions = {
    create({ commit }, data) {
        exercises
            .create(data.data)
            .then(res => {
                console.log(data.hint);
                hints.create(res.id, data.hint);
            })
            .catch(error => console.log(error));
    },
    getExercices({ commit }, data) {
        switch (data.mode) {
            case 'intelligent':
                exercises.getIntelligent().then(res => {
                    commit('setExercises', res);
                })
                    .catch(error => console.log(error));
                break;
            case 'topics':
                exercises.getSet(data.topics, data.limit).then(res => {
                    commit('setExercises', res);
                })
                    .catch(error => console.log(error));
                break;
            default:
                exercises.getRandom(data.limit).then(res => {
                    commit('setExercises', res);
                })
                    .catch(error => console.log(error));
        }
    }
}

const mutations = {
    setExercises(state, data) {
        state.set = data;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}