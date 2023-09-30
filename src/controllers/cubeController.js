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
    const accessories = await accessoryManager.getOthers(cube.accessories).lean();
    const hasAccessories = accessories.length > 0; // За да подадем на hbs данни за иф-а
    res.render('accessory/attach', { cube, accessories, hasAccessories });
});
router.post('/:cubeId/attach-accessory', (req, res) => {
    const { accessory: accessoryId } = req.body; // тaka се преименува
    const cubeId = req.params.cubeId;

    cubeManager.attachAccessory(cubeId, accessoryId);

    res.redirect(`/cubes/details/${cubeId}`);
});

module.exports = router;