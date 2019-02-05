import API from './api'

export default {

    create(data) {
        return API.post('quizzs', data)
            .then(r => {
                return r.data
            })
    },
    getByTopics(topics) {
        return API.get('quizzs/set/' + topics)
            .then(r => {
                return r.data
            })
    },
    upvote(quizzId) {
        return API.post('quizzs/upvote/' + quizzId, null)
        .then(r => {
            return r.data
        })
    },
    downvote(quizzId) {
        return API.delete('quizzs/downvote/' + quizzId)
        .then(r => {
            return r.data
        })
    }
}