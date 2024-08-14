import ResponseObj from "../Utils/responseObj.js";
import Constants from "../Utils/constants.js";
import Valid from "../Utils/valid.js";
import ColorService from "../Services/colors.js";
import ValidToken from "./validToken.js";

const ColorController = {
    getAll: async () => {
        return ResponseObj(200, Constants.success, await ColorService.getAll());
    },
    getById: async (id) => {
        return ResponseObj(200, Constants.success, await ColorService.getById(id));
    },

    create: async (token, color) => {
        const ckToken = await ValidToken.checkToken(token);
        if(ckToken.status != 200) return ResponseObj(ckToken.status, ckToken.message);

        if(Valid.isEmpty(color.name) || Valid.isEmpty(color.hex)) return ResponseObj(300, Constants.empty);
        if(!Valid.isNameVI(color.name) || !Valid.isHex(color.hex)) return ResponseObj(300, Constants.invalid_data);

        let response = await ColorService.create({name: color.name, hex: color.hex});
        if(response == null) return ResponseObj(300, Constants.something_wrong);

        return ResponseObj(200, Constants.success);
    },

    update: async (token, color) => {
        const ckToken = await ValidToken.checkToken(token);
        if(ckToken.status != 200) return ResponseObj(ckToken.status, ckToken.message);

        if(Valid.isEmpty(color.name) || Valid.isEmpty(color.hex)) return ResponseObj(300, Constants.empty);
        if(!Valid.isNameVI(color.name) || !Valid.isHex(color.hex)) return ResponseObj(300, Constants.invalid_data);

        let response = await ColorService.update(color);
        if(response == null) return ResponseObj(300, Constants.something_wrong);

        return ResponseObj(200, Constants.success);
    },

    delete: async (token, body) => {
        const ckToken = await ValidToken.checkToken(token);
        if(ckToken.status != 200) return ResponseObj(ckToken.status, ckToken.message);

        if(Valid.isEmpty(body.id)) return ResponseObj(300, Constants.empty);
        if(!Valid.isNumber(body.id)) return ResponseObj(300, Constants.invalid_data);

        let response = await ColorService.delete(body.id);
        if(response == null) return ResponseObj(300, Constants.something_wrong);

        return ResponseObj(200, Constants.success);
    }
}

export default ColorController;