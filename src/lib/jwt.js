//Part 3 workshop
const { promisify } = require('util');
const jsonwebtoken = require('jsonwebtoken'); //jwt не поддържа promise синтаксис
// с тази ютилка(promisify) обръщаме callbacks във promisses
const jwt = {
    sign: promisify(jsonwebtoken.sign),
    verify: promisify(jsonwebtoken.verify)
};
module.exports = jwt;