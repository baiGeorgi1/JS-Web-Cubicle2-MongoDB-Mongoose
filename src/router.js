const router = require('express').Router();
const homeConfig = require('./controllers/homeController');
const cubeController = require('./controllers/cubeController');
const accessoryController = require('./controllers/accessoryController');

router.use(homeConfig);
router.use('/cubes', cubeController); // if the path starts with (/cubes)
router.use('/accessories', accessoryController);
router.get('*', (req, res) => {
    res.redirect('/404');
});
module.exports = router;