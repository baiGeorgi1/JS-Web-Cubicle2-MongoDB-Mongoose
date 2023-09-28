const express = require('express');

const PORT = 5000;
const app = express();

const expConfigurator = require('./config/expConfig');
const hbsConfigurator = require('./config/hbsConfig');
const router = require('./controllers/homeController');
const dbConnect = require('./config/dbConfig');

//express config
expConfigurator(app);
//handlebars setup
hbsConfigurator(app);

//connect DB and catch err
dbConnect()
    .then(() => console.log('DB connected successfully!'))
    .catch(err => { console.log(`DB error:`, err); });

//Routes - можем да ги изнесем в отделен route със homeContr & cubeContr
app.use(router);


app.listen(PORT, () => console.log(`Server is listeninig on ${PORT}...`));