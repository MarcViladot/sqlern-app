import API from './api'

export default {

    create(data) {
        return API.post('quizzs', data)
            .then(r => {
                return r.data
            })
    },
    update(id, data) {
        return API.put('quizzs/' + id, data)
            .then(r => {
                return r.data
            })
    },
    getByTopics(topics, name) {
        return API.get('quizzs/set/' + topics + '/' + name)
            .then(r => {
                return r.data
            })
    },
    getById(id) {
        return API.get('quizzs/' + id)
            .then(r => {
                return r.data
            })
    },
    getByCode(code) {
        return API.get('generatedquizzs/code/' + code)
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
    },
    generateQuizz(quizzId) {
        return API.post('generatedquizzs', { quizz_id: quizzId })
            .then(r => {
                return r.data
            })
    },
    answerQuizz(data) {
        return API.post('answeredquizzs', data)
            .then(r => {
                return r.data
            })
    },
    getAnsweredQuizz(id) {
        return API.get('answeredquizzs/' + id)
            .then(r => {
                return r.data
            })
    },
    isAnswered(code) {
        return API.get('answeredquizzs/answered/' + code)
            .then(r => {
                return r.data
            })
    },
    delete(id) {
        return API.delete('quizzs/' + id)
            .then(r => {
                return r.data
            })
    }
}