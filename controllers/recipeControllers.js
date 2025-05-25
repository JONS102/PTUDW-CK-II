let controller = {};
let models = require('../models');
let sequelize = require('sequelize');
let Op = sequelize.Op;
controller.search = (keyword) => {
    return models.Recipe.findAll({
        [Op.or]: {
            title: {
                [Op.like]: `%${keyword}%`
            },
            description: {
                [Op.like]: `%${keyword}%`
            }
        }
    });
};
controller.getById = (id) => {
    return models.Recipe.findOne({
        where: {
            id: id
        },
        include: [{
            models: models.Ingredient,
            as: 'ingredients'
        }, {
            m2odels: models.Direction,
            as: 'Directions',
            order: ['order']
        }]
    })
};

controller.getAll = () => {
    return models.Recipe.findAll({ // hiển thị tóm tắt
        include: [{
            model: models.Ingredient,
            as: 'ingredients',
            limit: 3
        }, ]
    });
};
module.exports = controller;