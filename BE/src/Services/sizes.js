import Sizes from "../Models/sizes.js";

const SizesService = {
    getAll: async () => {
        try {
            return await Sizes.findAll();
        }
        catch(err) {
            return null;
        }
    },

    getById: async (id) => {
        try {
            return await Sizes.findByPk(id);
        }
        catch(err) {
            return null;
        }
    },

    create: async (Size) => {
        try {
            return await Sizes.create(Size);
        }
        catch(err) {
            return null;
        }
    },

    update: async (Size) => {
        try {
            return await Sizes.update(Size, {
                where: {
                    id: Size.id
                }
            });
        }
        catch(err) {
            return null;
        }
    },

    delete: async (id) => {
        try {
            return await Sizes.destroy({
                where: {
                    id: id
                }
            });
        }
        catch(err) {
            return null;
        }
    }
}

export default SizesService;