import exercises from '../../api/exercises'

const state = {
    set: []
}

const getters = {
}

const actions = {
    create({ commit }, data) {
        exercises
            .create(data)
            .then(res => {
                console.log(res);
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