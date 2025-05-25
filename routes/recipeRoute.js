const express = require('express');
const route = express.Router();
const controller = require('../controllers/recipeControllers');

route.get('/', (req, res) => {
    let keyword = req.query.keyword || '';
    controller.search(keyword).then(results => {
        res.render('recipes', { recipes: results });
    });

});

route.get('/:id', (req, res) => {
    let id = req.params.id;
    controller.getById(id).then(recipe => {
        res.locals.recipe = recipe;
        res.render('featured');
    })
});
module.exports = route;