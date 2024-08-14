import AdminService from "../Services/admins.js";
import TokenService from "../Services/token.js";
import Valid from "../Utils/valid.js";
import Constants from "../Utils/constants.js";
import ResponseObj from "../Utils/responseObj.js";
import ValidToken from "./validToken.js";

const AdminsController = {
    login: async (body) => {
        if(Valid.isEmpty(body.username) || Valid.isEmpty(body.password)) return ResponseObj(300, Constants.empty);

        if(!Valid.isString(body.username)) return ResponseObj(300, Constants.login_failed)
        if(!Valid.isPassword(body.password)) return ResponseObj(300, Constants.login_failed);

        const Admin = await AdminService.getByUsername(body.username);
        if(Admin === null) return ResponseObj(300, Constants.login_failed);
        if(Admin.password !== body.password) return ResponseObj(300, Constants.login_failed);

        const token = TokenService.createToken(Admin.id);
        const rs = {
            "fullname": Admin.fullname,
            "token": token
        }
        await AdminService.updateToken(Admin.id, token);
        return ResponseObj(200, Constants.success, rs);
    },

    logout: async (token) => {
        if(token === null) return ResponseObj(300, Constants.token_invalid);
        const Admin = await AdminService.getAdminByToken(token);
        if(Admin === null) return ResponseObj(300, Constants.client_not_found);
        await AdminService.deleteToken(Admin.id);
        return ResponseObj(200, Constants.success);
    },
    
    changePassword: async (token, body) => {
        const ckToken = await ValidToken.checkToken(token);
        if(ckToken.status != 200) return ResponseObj(ckToken.status, ckToken.message);
        
        const Admin = await AdminService.getAdminByToken(token);
        if(Admin === null) return ResponseObj(403, Constants.token_incorrect);
        
        if(Valid.isEmpty(body.prePassword) || Valid.isEmpty(body.newPassword)) return ResponseObj(300, Constants.empty);
        if(Admin.password !== body.prePassword) return ResponseObj(300, Constants.prePassword_incorrect);
        if(!Valid.isPassword(body.newPassword)) return ResponseObj(300, Constants.password_invalid);
        if(body.newPassword === body.prePassword) return ResponseObj(300, Constants.prePass_equal_newPass);

        try{
            await AdminService.changePassword(Admin.id, body.newPassword);
            return ResponseObj(200, Constants.success);
        }
        catch(err){
            return ResponseObj(300, Constants.something_wrong);
        }
    },

    changeName: async (token, body) => {
        const ckToken = await ValidToken.checkToken(token);
        if(ckToken.status != 200) return ResponseObj(ckToken.status, ckToken.message);

        const Admin = await AdminService.getAdminByToken(token);
        if(Admin === null) return ResponseObj(403, Constants.token_incorrect);

        if(Valid.isEmpty(body.password) || Valid.isEmpty(body.newName)) return ResponseObj(300, Constants.empty);
        if(Admin.password !== body.password) return ResponseObj(300, Constants.password_incorrect);
        if(!Valid.isName(body.newName)) return ResponseObj(300, Constants.name_invalid);
        if(Admin.name === body.newName) return ResponseObj(300, Constants.preName_equal_newName);

        try{
            await AdminService.changeName(Admin.id, body.newName);
            return ResponseObj(200, Constants.success);
        }
        catch(err){
            return ResponseObj(300, Constants.something_wrong);
        }
    }
}

export default AdminsController;