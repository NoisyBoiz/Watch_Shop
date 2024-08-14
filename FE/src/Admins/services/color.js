import Fetch from "./fetch"

const ColorService = {
    async getAll(data) {
        return await Fetch.get("/colors/list", data)
    },
    async getById(id) {
        return await Fetch.get(`/colors/getById?id=${id}`)
    },
    async create(data) {
        return await Fetch.post("/colors/create", data)
    },
    async update(data) {
        return await Fetch.put("/colors/update", data)
    },
    async delete(id) {
        return await Fetch.delete("/colors/delete", { id: id })
    }
}

export default ColorService