import Fetch from "./fetch"

const SizeService = {
    async getAll(data) {
        return await Fetch.get("/sizes/list", data)
    },
    async getById(id) {
        return await Fetch.get(`/sizes/getById?id=${id}`)
    },
    async create(data) {
        return await Fetch.post("/sizes/create", data)
    },
    async update(data) {
        return await Fetch.put("/sizes/update", data)
    },
    async delete(id) {
        return await Fetch.delete("/sizes/delete", { id: id })
    }
}

export default SizeService