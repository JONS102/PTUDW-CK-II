const express = require('express');
const app = express();
app.use(express.static(__dirname + '/public'));
//ĐỊnh nghĩa cho ứng dụng express sử dụng View Engine 
const { engine } = require('express-handlebars');
app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts',
    runtimeOptions: { allowProtoProperties: true } // cho phép sử dụng các thuộc tính trong handlebars
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
//Tạo database
app.get('/sync', (req, res) => {
    let models = require('./models');
    models.sequelize.sync().then(() => {
        res.send('Database synchronized successfully');
    });
}); // tạo table trong db

app.set('view engine', 'hbs');
//Định nghĩa các route hiển thị 3 trang khác nhau
app.get('/', (req, res) => {
    res.render('index');
});
app.use('/recipes', require('./routes/recipeRoute')); // khi yêu cầu recipes, chuyển tới route



app.set('port', process.env.PORT || 3000);
app.listen(app.get(('port')), () => {
    console.log(`Server running on port ${app.get('port')}`);
});