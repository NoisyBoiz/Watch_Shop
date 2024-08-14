import WatchService from "../Services/watchs.js";
import ResponseObj from "../Utils/responseObj.js";
import Constants from "../Utils/constants.js";
import Valid from "../Utils/valid.js";
import DetailService from "../Services/details.js";
import ImageService from "../Services/images.js";
import ValidToken from "./validToken.js";
import Cloudinary from 'cloudinary';

Cloudinary.config({
    cloud_name: process.env.CL_NAME,
    api_key: process.env.CL_API_KEY,
    api_secret: process.env.CL_API_SECRET
});

const WatchController = {
    getAll: async () => {
        return ResponseObj(200, Constants.success, await WatchService.getAll());
    },
    getById: async (id) => {
        return ResponseObj(200, Constants.success, await WatchService.getById(id));
    },
    getByName: async (name) => {
        let rs = await WatchService.getByName(name);
        if(rs === null) rs = [];
        return ResponseObj(200, Constants.success, rs);
    },

    create: async (token, watch) => {
        const ckToken = await ValidToken.checkToken(token);
        if(ckToken.status != 200) return ResponseObj(ckToken.status, ckToken.message);
        
        if(Valid.isEmpty(watch.name) || Valid.isEmpty(watch.description) || Valid.isEmpty(watch.id_size)) return ResponseObj(300, Constants.empty);
        if(!Valid.isString(watch.name)) return ResponseObj(300, Constants.invalid_data);

        for(let i = 0; i < watch.images.length; i++) {
            let image = watch.images[i];
            if(Valid.isEmpty(image.url)) return ResponseObj(300, Constants.empty);
            if(!Valid.isUrl(image.url) && !Valid.isBase64(image.url)) return ResponseObj(300, Constants.invalid_data);
        }

        for(let i = 0; i < watch.details.length; i++) {
            let detail = watch.details[i];
            if(Valid.isEmpty(detail.id_color) || Valid.isEmpty(detail.price) || Valid.isEmpty(detail.quantity)) return ResponseObj(300, Constants.empty);
            if(!Valid.isNumber(detail.id_color) || !Valid.isNumber(detail.price) || !Valid.isNumber(detail.quantity)) return ResponseObj(300, Constants.invalid_data);
        }

        let response = await WatchService.create({name: watch.name, description: watch.description, id_size: watch.id_size});
        if(response == null) return ResponseObj(300, Constants.something_wrong);

        const idWatch = response.dataValues.id

        let ImageSave = [];
        let listPromiseUpCloud = [];
        for(let i = 0; i < watch.images.length; i++) {
            if(Valid.isBase64(watch.images[i].url)) listPromiseUpCloud.push(Cloudinary.v2.uploader.upload(watch.images[i].url));
            else ImageSave.push({id_watch: idWatch, url: watch.images[i].url});
        }   

        let result = await Promise.all(listPromiseUpCloud);
        for(let i = 0; i < result.length; i++) {
            ImageSave.push({id_watch: idWatch, url: result[i].secure_url, cl_id: result[i].public_id});
        }

        let ImagePromise = ImageService.createMany(ImageSave);
        let DetailPromise = DetailService.createMany(watch.details.map(e => {
            return {"id_watch": idWatch, "id_color": e.id_color, "price": e.price, "quantity": e.quantity, "oldPrice": e.oldPrice};
        }));
        
        response = await Promise.all([ImagePromise, DetailPromise]);
        if(response[0] == null || response[1] == null) {
            WatchService.delete(idWatch);
            ImageSave.map(e => {
                if(e.cl_id != null) Cloudinary.v2.uploader.destroy(e.cl_id);
            });
            ImageService.deleteByIdWatch(idWatch);
            DetailService.deleteByIdWatch(idWatch);
            return ResponseObj(300, Constants.something_wrong);
        };
        return ResponseObj(200, Constants.success);
    },

    update: async (token, watch) => {
        const ckToken = await ValidToken.checkToken(token);
        if(ckToken.status != 200) return ResponseObj(ckToken.status, ckToken.message);
        
        if(Valid.isEmpty(watch.id) || Valid.isEmpty(watch.name) || Valid.isEmpty(watch.description) || Valid.isEmpty(watch.id_size)) return ResponseObj(300, Constants.empty);
        if(!Valid.isString(watch.name)) return ResponseObj(300, Constants.invalid_data);

        let listImageAdd = [];
        let listDetailAdd = [];

        let ImagePromise = ImageService.getByIdWatch(watch.id);
        let DetailPromise = DetailService.getByIdWatch(watch.id);
        
        let rs = await Promise.all([ImagePromise, DetailPromise]);
        if(rs[0] == null || rs[1] == null) return ResponseObj(300, Constants.something_wrong);
        let listImage = rs[0];
        let listDetail = rs[1];

        for(let i = 0; i < watch.images.length; i++) {
            let image = watch.images[i];
            if(Valid.isEmpty(image.url)) return ResponseObj(300, Constants.empty);
            if(!Valid.isUrl(image.url) && !Valid.isBase64(image.url)) return ResponseObj(300, Constants.invalid_data);
            if(image.id == null) listImageAdd.push({id_watch: watch.id, url: image.url});
            else{
                let index = listImage.findIndex(e => e.id == image.id);
                if(index != -1) listImage.splice(index, 1);
            }
        }

        for(let i = 0; i < watch.details.length; i++) {
            let detail = watch.details[i];
            if(Valid.isEmpty(detail.id_color) || Valid.isEmpty(detail.price) || Valid.isEmpty(detail.quantity)) return ResponseObj(300, Constants.empty);
            if(!Valid.isNumber(detail.id_color) || !Valid.isNumber(detail.price) || !Valid.isNumber(detail.quantity)) return ResponseObj(300, Constants.invalid_data);
            if(detail.id == null) listDetailAdd.push({id_watch: watch.id, id_color: detail.id_color, price: detail.price, quantity: detail.quantity, oldPrice: detail.oldPrice});
            else{
                let index = listDetail.findIndex(e => e.id == detail.id);
                if(index != -1) listDetail.splice(index, 1);
            }
        }

        if(listImage.length > 0) {
            for(let i = 0; i < listImage.length; i++) {
                if(listImage[i].cl_id != null) Cloudinary.v2.uploader.destroy(listImage[i].cl_id);
            }
            ImageService.deleteMany(listImage);
        }
        if(listDetail.length > 0) DetailService.deleteMany(listDetail);

        let response = await WatchService.update({id: watch.id, name: watch.name, description: watch.description, id_size: watch.id_size});
        if(response == null) return ResponseObj(300, Constants.something_wrong);
    
        let ImageSave = [];
        let listPromiseUpCloud = [];
        for(let i = 0; i < listImageAdd.length; i++) {
            if(Valid.isBase64(listImageAdd[i].url)) listPromiseUpCloud.push(Cloudinary.v2.uploader.upload(listImageAdd[i].url));
            else ImageSave.push({id_watch: watch.id, url: listImageAdd[i].url});
        }

        let result = await Promise.all(listPromiseUpCloud);
        for(let i = 0; i < result.length; i++) {
            ImageSave.push({id_watch: watch.id, url: result[i].secure_url, cl_id: result[i].public_id});
        }

        ImagePromise = ImageService.createMany(ImageSave);
        DetailPromise = DetailService.createMany(listDetailAdd);
        
        response = await Promise.all([ImagePromise, DetailPromise]);
        if(response[0] == null || response[1] == null) return ResponseObj(300, Constants.something_wrong);
        return ResponseObj(200, Constants.success, null);
    },

    delete: async (token, body) => {
        const ckToken = await ValidToken.checkToken(token);
        if(ckToken.status != 200) return ResponseObj(ckToken.status, ckToken.message);
        if(Valid.isEmpty(body.id)) return ResponseObj(300, Constants.empty);

        let listImage = await ImageService.getByIdWatch(body.id);
        let listPromiseUpCloud = [];
        listImage.forEach(element => {
            if(element.cl_id != null) listPromiseUpCloud.push(Cloudinary.v2.uploader.destroy(element.cl_id));
        });
        await Promise.all(listPromiseUpCloud);

        let ImagePromise = ImageService.deleteByIdWatch(body.id);
        let DetailPromise = DetailService.deleteByIdWatch(body.id);
        let WatchPromise = WatchService.delete(body.id);

        let response = await Promise.all([ImagePromise, DetailPromise, WatchPromise]);
        if(response[0] == null || response[1] == null || response[2] == null) return ResponseObj(300, Constants.something_wrong);

        return ResponseObj(200, Constants.success, null);
    }
}

export default WatchController;