import Fetch from './fetch.js';

const watchService = {
    async getAll(data) {
        const res = await Fetch.get('/watchs/list', data);
        return res
    }, 
    async getById(id) {
        const res = await Fetch.get(`/watchs/getById?id=${id}`);
        return res
    },
    async getByName(name) {
        const res = await Fetch.get(`/watchs/getByName?name=${name}`);
        return res
    },

    async create(data) {
        const res = await Fetch.post('/watchs/create', data);
        return res
    },

    async update(data) {
        const res = await Fetch.put('/watchs/update', data);
        return res
    },  

    async delete(id) {
        return await Fetch.delete('/watchs/delete', {id: id});
    }
}

export default watchService;