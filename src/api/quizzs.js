import API from './api'

export default {

    create(data) {
        return API.post('quizzs', data)
            .then(r => {
                return r.data
            })
    },
    createQuizzExercise(data) {
        return API.post('quizzexercises', data)
            .then(r => {
                return r.data
            })
    }
}