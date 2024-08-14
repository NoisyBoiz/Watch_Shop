import Fetch from "../../Admins/services/fetch.js";

const ColorService = {
    async getAll(data) {
        return await Fetch.get("/sizes/list", data)
    }
}

export default ColorService