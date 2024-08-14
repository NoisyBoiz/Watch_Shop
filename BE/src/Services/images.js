import Images from "../Models/images.js";

const ImagesService = {
    getByIdWatch: async (idWatch) => {
        try {
            return await Images.findAll({where: {id_watch: idWatch}});
        }
        catch(err) {
            return null;
        }
    },
    createMany: async (images) => {
        try {
            return await Images.bulkCreate(images);
        }
        catch(err) {
            return null;
        }
    },
    deleteMany: async (images) => {
        try {
            return await Images.destroy({where: {id: images.map(e => e.id)}});
        }
        catch(err) {
            return null;
        }
    },
    deleteByIdWatch: async (idWatch) => {
        try {
            return await Images.destroy({where: {id_watch: idWatch}});
        }
        catch(err) {
            return null;
        }
    }
}

export default ImagesService;