import API from './api'

export default {

    create(data) {
        return API.post('exercises', data)
            .then(r => {
                return r.data
            })
    },
    addTopic(data) {
        return API.post('topicexercises', data)
            .then(r => {
                return r.data
            })
    }
}