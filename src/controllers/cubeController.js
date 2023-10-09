const router = require('express').Router();

const cubeManager = require('../managers/cubeManager');
const accessoryManager = require('../managers/accessoryManager');
const { selectedDifficultyOption } = require('../utils/viewHelpers');

//path comming as '/cubes/anyPath
router.get('/create', (req, res) => {

    res.render('cube/create');
});


router.get('/details/:cubeId', async (req, res) => {
    const cube = await cubeManager.getById(req.params.cubeId).lean(); //tuk e ediniq variant s lean връща {}

    if (!cube) {
        res.redirect('/404');
    }
    const isOwner = cube.owner?.toString() === req.user._id;  // part 3 authentication

    res.render('cube/details', { cube, isOwner });

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
        difficultyLvl: Number(difficultyLevel),
        owner: req.user._id, // part 3 workshop
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

//part 3 => Delete cube page
router.get('/delete/:cubeId', async (req, res) => {
    //трябва да имаме .lean() ,защото връща документ.На нас ни трябва обект!
    const cube = await cubeManager.getById(req.params.cubeId).lean();
    const difficulty = selectedDifficultyOption(cube.difficultyLvl);
    res.render('cube/delete', { cube, difficulty });
});
router.post('/delete/:cubeId', async (req, res) => {
    await cubeManager.delete(req.params.cubeId).lean();
    res.redirect('/');
});

//part 3 - edit page
router.get('/edit/:cubeId', async (req, res) => {
    const cube = await cubeManager.getById(req.params.cubeId).lean();

    const difficulty = selectedDifficultyOption(cube.difficultyLvl);

    res.render('cube/edit', { cube, difficulty });
});
router.post('/edit/:cubeId', async (req, res) => {
    const cubeData = req.body;
    await cubeManager.update(req.params.cubeId, cubeData);
    res.redirect(`/cubes/details/${req.params.cubeId}`);
});

module.exports = router;