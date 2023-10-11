const router = require('express').Router();
const userManager = require('../managers/userManager');
const { extractErrorMessages } = require('../utils/errorHelper');

router.get('/register', (req, res) => {
    res.render('users/register');

});
router.post('/register', async (req, res) => {
    const { username, password, repeatPassword } = req.body;
    //ERROR HANDLING
    try {

        // тук можем да използваме контролера да провери дали паролите съвпадат. Но ще упражним могуус model.
        await userManager.register({ username, password, repeatPassword });
        res.redirect('/users/login');

    } catch (err) {
        // console.log(error); // Тук са всички грешки!
        // Вариант 1 => само първата грешка
        // const firstError = Object.values(err.errors)[0].message;
        // res.status(400).render('users/register', { errorMessage: firstError });
        //Вариант 2 => всяка грешка (в main.js вместо с {{#if}} , използваме {{#each}})
        const allErrorMessages = extractErrorMessages(err);
        res.status(400).render('users/register', { allErrorMessages });
    }
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