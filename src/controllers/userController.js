const router = require('express').Router();
const userManager = require('../managers/userManager');

router.get('/register', (req, res) => {
    res.render('users/register');

});
router.post('/register', async (req, res) => {
    const { username, password, repeatPassword } = req.body;
    console.log(req.body);
    // тук можем да използваме контролера да провери дали паролите съвпадат. Но ще упражним могуус model.
    await userManager.register({ username, password, repeatPassword });
    res.redirect('/users/login');
});

router.get('/login', (req, res) => {
    res.render('users/login');
});
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const token = await userManager.login(username, password);
    res.cookie('auth', token, { httpOnly: true }); // set-ваме куки,за да знае браузера,че има логване

    res.redirect('/');
});
router.get('/logout', (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
});
module.exports = router;