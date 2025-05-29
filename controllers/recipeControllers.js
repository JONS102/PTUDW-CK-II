let controller = {};
let models = require('../models');
let sequelize = require('sequelize');
let Op = sequelize.Op;
controller.search = (keyword) => {
    return models.Recipe.findAll({
        [Op.or]: {
            title: {
                [Op.iLike]: `%${keyword}%`
            },
            description: {
                [Op.iLike]: `%${keyword}%`
            }
        }
    });
};
controller.getById = (id) => {
    return models.Recipe.findOne({
        where: { id: id },
        include: [{
                model: models.Ingredient, // đúng là model, không phải models
                as: 'Ingredients'
            },
            {
                model: models.Direction, // đúng là model, không phải m2odels
                as: 'Directions',
                order: ['order']
            }
        ]
    });
};

controller.getAll = () => {
    return models.Recipe.findAll({
        raw: true // hoặc .then(rs => rs.map(r => r.get({ plain: true })))
    });
};
module.exports = controller;