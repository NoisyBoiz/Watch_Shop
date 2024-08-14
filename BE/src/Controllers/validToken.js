import AdminsService from "../Services/admins.js";
import TokenService from "../Services/token.js";
import Valid from "../Utils/valid.js";
import Constants from "../Utils/constants.js";
import ResponseObj from "../Utils/responseObj.js";

const ValidToken = {
    checkToken: async (token) => {    
        if(Valid.isEmpty(token)) return ResponseObj(403, Constants.token_invalid);
        const Admin = await AdminsService.getAdminByToken(token);
        if(Admin === null) return ResponseObj(403, Constants.token_incorrect);
        if(!TokenService.checkTokenExpiry(token)) return ResponseObj(403, Constants.token_expired);
        return ResponseObj(200, Constants.success);
    }
}

export default ValidToken;
