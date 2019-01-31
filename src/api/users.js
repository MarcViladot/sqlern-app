import API from './api'

export default {

    login(credentials) {
        return API.post('authenticate', credentials)
            .then(r => {
                return r.data
            })
    },

    getCurrentUser() {
        return API.get('users?me=true')
            .then(r => {
                return r.data
            })
    },

    signup(data) {
        return API.post('users', data)
            .then(r => {
                return r.data
            })
    }

}