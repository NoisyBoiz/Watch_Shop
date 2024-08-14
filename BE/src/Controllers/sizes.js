import ResponseObj from "../Utils/responseObj.js";
import Constants from "../Utils/constants.js";
import Valid from "../Utils/valid.js";
import ValidToken from "./validToken.js";
import SizeService from "../Services/sizes.js";

const SizeController = {
    getAll: async () => {
        return ResponseObj(200, Constants.success, await SizeService.getAll());
    },

    getById: async (id) => {
        return ResponseObj(200, Constants.success, await SizeService.getById(id));
    },

    create: async (token, Size) => {
        const ckToken = await ValidToken.checkToken(token);
        if(ckToken.status != 200) return ResponseObj(ckToken.status, ckToken.message);

        if(Valid.isEmpty(Size.name)) return ResponseObj(300, Constants.empty);
        if(!Valid.isString(Size.name)) return ResponseObj(300, Constants.invalid_data);

        let response = await SizeService.create({name: Size.name});
        if(response == null) return ResponseObj(300, Constants.something_wrong);

        return ResponseObj(200, Constants.success);
    },

    update: async (token, Size) => {
        const ckToken = await ValidToken.checkToken(token);
        if(ckToken.status != 200) return ResponseObj(ckToken.status, ckToken.message);

        if(Valid.isEmpty(Size.name)) return ResponseObj(300, Constants.empty);
        if(!Valid.isString(Size.name)) return ResponseObj(300, Constants.invalid_data);

        let response = await SizeService.update(Size);
        if(response == null) return ResponseObj(300, Constants.something_wrong);

        return ResponseObj(200, Constants.success);
    },

    delete: async (token, body) => {
        const ckToken = await ValidToken.checkToken(token);
        if(ckToken.status != 200) return ResponseObj(ckToken.status, ckToken.message);

        if(Valid.isEmpty(body.id)) return ResponseObj(300, Constants.empty);
        if(!Valid.isNumber(body.id)) return ResponseObj(300, Constants.invalid_data);

        let response = await SizeService.delete(body.id);
        if(response == null) return ResponseObj(300, Constants.something_wrong);

        return ResponseObj(200, Constants.success);
    }
}

export default SizeController;