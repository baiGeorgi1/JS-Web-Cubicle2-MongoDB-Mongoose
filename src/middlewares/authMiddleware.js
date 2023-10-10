//Part 3 workshop
const jwt = require('../lib/jwt');
const { SECRET } = require('../config/config');

exports.auth = async (req, res, next) => {
    const token = req.cookies['auth'];
    if (token) {
        // validate token 
        try {

            const user = await jwt.verify(token, SECRET); // запазваме токена в потр. на req.user
            req.user = user; // оттук изпращаме по веригата на следващите,кой е потребителя  
            //тук сетваме променливи,които са достъпни през темл.енджини
            res.locals.user = user; // така можем в темлейтите да достъпваме данните на потреб.
            res.locals.isAuthenticated = true;

            next();
            //ако е изтекъл токена или е невалиден 
        } catch (err) {
            res.clearCookie('auth');
            res.redirect('/users/login');
        }
    } else {
        next();
    }
};
exports.isAuth = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/users/login');
    }
    next();
};