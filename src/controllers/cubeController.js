const router = require('express').Router();
const cubeManager = require('../managers/cubeManager');

//path comming as '/cubes/anyPath
router.get('/create', (req, res) => {
    res.render('create');
});
router.get('/details/:cubeId', (req, res) => {
    const cube = cubeManager.getById(req.params.cubeId);
    res.render('details', (cube));

});

router.post('/create', (req, res) => { //тук взимаме данни от bodyParser-a
    //console.log(req.body) трябва да запазим данните от парсера в нова папка (manager)
    const {
        name,
        description,
        imageUrl,
        difficultyLevel } = req.body;
    cubeManager.create({
        name,
        description,
        imageUrl,
        difficultyLvl: Number(difficultyLevel)
    });

    res.redirect('/');
});

module.exports = router;