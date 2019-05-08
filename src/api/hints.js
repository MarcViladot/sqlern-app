import API from './api'

export default {

    create(exerciseId, hint) {
        return API.post('comments', {exercise_id: exerciseId, comment: hint})
            .then(r => {
                return r.data
            })
    }
}