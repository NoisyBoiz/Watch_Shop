import Watchs from "../Models/watchs.js";
import Colors from "../Models/colors.js";
import Images from "../Models/images.js";
import Details from "../Models/details.js";
import Sizes from "../Models/sizes.js";
import sequelize from "../Config/index.js";

Watchs.hasMany(Details, {foreignKey: 'id_watch', as: 'details'});
Details.belongsTo(Watchs, {foreignKey: 'id_watch', as: 'watch'});

Sizes.hasMany(Watchs, {foreignKey: 'id_size', as: 'watchs'});
Watchs.belongsTo(Sizes, {foreignKey: 'id_size', as: 'sizes'});

Colors.hasMany(Details, {foreignKey: 'id_color', as: 'details'});
Details.belongsTo(Colors, {foreignKey: 'id_color', as: 'colors'});

Watchs.hasMany(Images, {foreignKey: 'id_watch', as: 'images'});
Images.belongsTo(Watchs, {foreignKey: 'id_watch', as: 'watch'});

const watchsService = {
    getAll: async () => {
        try{
            return await Watchs.findAll({include: [{model: Images, as: 'images', attributes: ['url']}, {model: Details, as: 'details', include: [{model: Colors, as: 'colors'}]}, {model: Sizes, as: 'sizes', attributes: ['name']}]});
        }
        catch(err) {
            return null;
        }
    },
    getById: async (id) => {
        try{
            return await Watchs.findOne({where: {id: id}, include: [{model: Details, as: 'details', include: [{model: Colors, as: 'colors'}]}, {model: Images, as: 'images'}, {model: Sizes, as: 'sizes', attributes: ['name']}]});
        }
        catch(err) {
            return null;
        }
    },
    getByName: async (name) => {
        try{
            return await Watchs.findAll({
                where: {
                    name: sequelize.where(sequelize.fn('LOWER', sequelize.col('watchs.name')), 'LIKE', '%' + name.toLowerCase() + '%')
                }, 
                include: [{model: Details, as: 'details', include: [{model: Colors, as: 'colors'}]}, {model: Images, as: 'images'}, , {model: Sizes, as: 'sizes', attributes: ['name']}]
            });
        }
        catch(err) {
            return null;
        }
    },
    create: async (watch) => {
        try{
            return await Watchs.create(watch);
        }
        catch(err) {
            return null;
        }
    },
    update: async (watch) => {
        try{
            return await Watchs.update(watch, {where: {id: watch.id}});
        }
        catch(err) {
            return null;
        }
    },
    delete: async (id) => {
        try{
            return await Watchs.destroy({where: {id: id}});
        }
        catch(err) {
            return null;
        }
    }
}

export default watchsService;