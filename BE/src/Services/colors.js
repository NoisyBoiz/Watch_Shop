import Colors from "../Models/colors.js";

const ColorsService = {
    getAll: async () => {
        try {
            return await Colors.findAll();
        }
        catch(err) {
            return null;
        }
    },

    getById: async (id) => {
        try {
            return await Colors.findByPk(id);
        }
        catch(err) {
            return null;
        }
    },

    create: async (color) => {
        try {
            return await Colors.create(color);
        }
        catch(err) {
            console.log(err);
            return null;
        }
    },

    update: async (color) => {
        try {
            return await Colors.update(color, {
                where: {
                    id: color.id
                }
            });
        }
        catch(err) {
            console.log(err);
            return null;
        }
    },

    delete: async (id) => {
        try {
            return await Colors.destroy({
                where: {
                    id: id
                }
            });
        }
        catch(err) {
            console.log(err);
            return null;
        }
    }
}

export default ColorsService;