const express = require('express');

const PORT = 5000;
const app = express();

const expConfigurator = require('./config/expConfig');
const hbsConfigurator = require('./config/hbsConfig');
const router = require('./router');
const dbConnect = require('./config/dbConfig');
//Глобалния ерор хендлър се използва,ако ще имаме редирект на 404
const errorMiddleWare = require('./middlewares/errorHandlerMiddleware'); // това е за глобален errorHandler (не е задулжителен)

//express config
expConfigurator(app);
//handlebars setup
hbsConfigurator(app);

//connect DB and catch err
dbConnect()
    .then(() => console.log('DB connected successfully!'))
    .catch(err => { console.log(`DB error:`, err.message); });

//Routes - можем да ги изнесем в отделен route със homeContr & cubeContr
app.use(router);
app.use(errorMiddleWare); // извикваме го веднага след раутовете,защото те имат възможност да го извикат!


app.listen(PORT, () => console.log(`Server is listeninig on ${PORT}...`));