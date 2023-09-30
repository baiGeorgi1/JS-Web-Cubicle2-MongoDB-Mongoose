const router = require('express').Router();

const cubeManager = require('../managers/cubeManager');
const accessoryManager = require('../managers/accessoryManager');

//path comming as '/cubes/anyPath
router.get('/create', (req, res) => {
    res.render('create');
});


router.get('/details/:cubeId', async (req, res) => {
    const cube = await cubeManager.getById(req.params.cubeId).lean(); //tuk e ediniq variant s lean връща {}

    if (!cube) {
        res.redirect('/404');
    }
    res.render('details', { cube });

});

router.post('/create', async (req, res) => { //тук взимаме данни от bodyParser-a
    //console.log(req.body) трябва да запазим данните от парсера в нова папка (manager)
    const {
        name,
        description,
        imageUrl,
        difficultyLevel } = req.body;
    await cubeManager.create({
        name,
        description,
        imageUrl,
        difficultyLvl: Number(difficultyLevel)
    });

    res.redirect('/');
});
router.get('/:cubeId/attach-accessory', async (req, res) => {
    const cube = await cubeManager.getById(req.params.cubeId).lean();
    const accessories = await accessoryManager.getAll().lean();
    res.render('accessory/attach', { cube, accessories });
});

module.exports = router;