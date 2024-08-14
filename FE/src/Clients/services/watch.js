import Fetch from "../../Admins/services/fetch.js";

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
    }
}

export default watchService;