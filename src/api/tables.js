import API from './api'

export default {

    create(query) {
        return API.post('create-tables', { sql_query: query })
            .then(r => {
                return r.data
            })
    },
    getTables() {
        return API.get('show-tables')
            .then(r => {
                return r.data
            })
    }
}