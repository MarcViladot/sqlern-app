import API from './api'

export default {

    getAll() {
        return API.get('topics')
            .then(r => {
                return r.data
            })
    }
}