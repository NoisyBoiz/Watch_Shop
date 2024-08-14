import Admins from "../Models/admins.js";

const adminsService = {
    getAdminById: async (id) => {
        try{
            return await Admins.findById(id);
        }
        catch(err) {
            return null;
        }
    },
    getAdminByToken: async (token) => { 
        try{
            return await Admins.findOne({where: {token: token}});
        }
        catch(err) {
            return null;
        }
    },
    getByUsername: async (username) => {
        try{
            return await Admins.findOne({where: {username: username}});
        }
        catch(err) {
            return null;
        }
    },
    createAdmin: async (user) => {
        try{
            return await Admins.create(user);
        }
        catch(err) {
            return null;
        }
    },
    changePassword: async (id, password) => {
        try{
            return await Admins.update({password: password}, {where: {id: id}});
        }
        catch(err) {
            return null;
        }
    },

    changeName: async (id, name) => {
        try{
            return await Admins.update({name: name}, {where: {id: id}});
        }
        catch(err) {
            return null;
        }
    },

    deleteAdmin: async (id) => {
        try{ 
            return await Admins.destroy({where: {id: id}});
        }
        catch(err) {
            return null;
        }
    },
    updateToken: async (id, token) => {
        try{
            return await Admins.update({token: token}, {where: {id: id}});
        }
        catch(err) {
            return null;
        }
    },
    deleteToken: async (id) => {
        try{
            return await Admins.update({token: null}, {where: {id: id}});
        }
        catch(err) {
            return null;
        }
    },
}

export default adminsService;