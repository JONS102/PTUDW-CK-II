const express = require('express');
const route = express.Router();
const controller = require('../controllers/recipeControllers');

route.get('/', (req, res) => {
    let keyword = req.query.keyword;
    console.log(keyword);
    //kiểm tra xem có từ khóa tìm kiếm hay không
    if (keyword != "" || keyword != undefined) {
        controller.getAll().
        then(recipes => {
            recipes.forEach((item, index) => {
                item.order = index % 2; // phân chia công thức thành 2 cột
            });
            res.locals.recipes = recipes;
            res.render('recipes'); // hiển thị các công thức tìm kiếm được
        });
    } else { // nếu không có từ khóa tìm kiếm thì lấy tất cả các công thức
        controller.search(keyword)
            .then(recipes => {
                recipes.forEach((item, index) => {
                    item.order = index % 2;
                });
                res.locals.recipes = recipes;
                res.render('recipes');
            });
    }

});

route.get('/:id', (req, res) => {
    let id = req.params.id;
    controller.getById(id).then(recipe => {
        res.locals.recipe = recipe;
        res.render('featured');
    })
});
module.exports = route;