import Fetch from "./fetch";

const Admin = {
    login: async (data) => {
        return await Fetch.post("/admins/login", data);
    },
    logout: async () => {
        Fetch.logout();
    },
    changePassword: async (oldPass, newPass) => {
        return await Fetch.put("/admins/changePassword", {prePassword: oldPass, newPassword: newPass});
    }
}

export default Admin;