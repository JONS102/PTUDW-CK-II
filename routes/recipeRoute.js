const express = require('express');
const route = express.Router();


route.get('/', (req, res) => {
    res.render('recipes');
});

route.get('/:id', (req, res) => {
    res.render('featured'); // muốn biết chi tiết hơn
});
module.exports = route;