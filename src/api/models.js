import API from './api'

export default {

    create(data) {
        return API.post('conceptualmodels', data)
            .then(r => {
                return r.data
            })
    }
}