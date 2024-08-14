import Details from "../Models/details.js";

const DetailService = {
    getByIdWatch: async (idWatch) => {
        try {
            return await Details.findAll({where: {id_watch: idWatch}});
        }
        catch(err) {
            return null;
        }
    },
    createMany: async (details) => {
        try {
            return await Details.bulkCreate(details);
        }
        catch(err) {
            return null;
        }
    },
    deleteMany: async (details) => {
        try {
            return await Details.destroy({where: {id: details.map(e => e.id)}});
        }
        catch(err) {
            return null;
        }
    },
    deleteByIdWatch: async (idWatch) => {
        try {
            return await Details.destroy({where: {id_watch: idWatch}});
        }
        catch(err) {
            return null;
        }
    }
}

export default DetailService;