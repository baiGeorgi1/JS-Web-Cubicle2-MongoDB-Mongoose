const User = require('../models/User');
const bcrypt = require('bcrypt'); // за validate password ни трябва


exports.register = (userData) => User.create(userData);
exports.login = async (username, password) => {
    //TODO find user
    const user = await User.findOne({ username });
    if (!user) {
        throw new Error('Cannot find username or password!'); // Ако няма потребител ,не трябва да издаваме,че няма такъв потр.,затова изписваме username or password.По-сигурно е от страна на хакване.
    }

    //TODO validate password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        throw new Error('Cannot find username or password!');
    }
    // return user
    return user;
};