const express = require('express');
const route = express.Router();
const controller = require('../controllers/recipeControllers');
let models = require('../models'); // PHẢI có dòng này ở đầu file

controller.getAll = () => {
    return models.Recipe.findAll().then(rs => rs.map(r => r.get({ plain: true })));
};

// ... các hàm khác
module.exports = controller;

route.get('/', (req, res) => {
    let keyword = req.query.keyword;
    if (keyword == undefined) {
        controller.getAll().then(recipes => {
            res.render('recipes', { recipes });
        });
    } else {
        controller.search(keyword)
            .then(results => {
                res.render('recipes', { recipes: results }); // Truyền trực tiếp biến recipes
            });
    }
});

route.get('/:id', (req, res) => {
    let id = req.params.id;
    controller.getById(id)
        .then(recipe => {
            res.locals.recipe = recipe;
            res.render('featured');
        })
});
module.exports = route;