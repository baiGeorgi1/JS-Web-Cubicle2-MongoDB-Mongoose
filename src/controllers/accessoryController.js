const router = require('express').Router();

router.get('/create', (req, res) => {
    res.render('accessory/create');

});
router.post('/create', (req, res) => {
    const body = req.body;
    //TO DO - add accessory data to DB


    res.redirect('/');
});

module.exports = router;