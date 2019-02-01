import exercises from '../../api/exercises'

const state = {}

const getters = {
}

const actions = {
    create({ commit, dispatch }, data) {
        exercises
            .create(data.data)
            .then(res => {
                dispatch("addTopics", {topics: data.topics, id: res.id});
            })
            .catch(error => console.log(error));
    },
    addTopics({ commit }, data) {
        data.topics.forEach(topic => {
            exercises.addTopic({ exercise_id: data.id, topic_id: topic }).then(res => {
                console.log(res);
            })
                .catch(error => console.log(error.response));
        });
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