import API from './api'

export default {

    create(data) {
        return API.post('exercises', data)
            .then(r => {
                return r.data
            })
    },
    update(id, data) {
        return API.put('exercises/' + id, data)
            .then(r => {
                return r.data
            })
    },
    addTopic(data) {
        return API.post('topicexercises', data)
            .then(r => {
                return r.data
            })
    },
    getSet(topics, limit) {
        return API.get('exercises/set/' + limit + '/' + topics)
            .then(r => {
                return r.data
            })
    },
    getRandom(limit) {
        return API.get('exercises/set/publics/' + limit)
            .then(r => {
                return r.data
            })
    },
    getIntelligent() {
        return API.get('exercises/set/intelligent')
            .then(r => {
                return r.data
            })
    },
    checkExercise(data) {
        return API.post('answeredexercises', data)
            .then(r => {
                return r.data
            })
    }
}