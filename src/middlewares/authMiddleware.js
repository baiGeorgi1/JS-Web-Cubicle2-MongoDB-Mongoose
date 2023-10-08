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