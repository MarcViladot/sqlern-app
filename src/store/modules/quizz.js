import exercises from '../../api/quizzs'
import quizzs from '../../api/quizzs';

const state = {}

const getters = {
}

const actions = {
    create({ commit, dispatch }, data) {
        quizzs.create(data.data).then(res => {
            dispatch("addExercises", { exercises: data.exercises, id: res.id });
        })
            .catch(error => console.log(error));
    },
    addExercises({ commit }, data) {
        data.exercises.forEach(exercise => {
            quizzs.createQuizzExercise({ quizz_id: data.id, exercise_id: exercise.id }).then(res => {
            })
                .catch(error => console.log(error));
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