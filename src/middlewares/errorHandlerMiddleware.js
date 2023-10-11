const { extractErrorMessages } = require('../utils/errorHelper');

module.exports = (err, req, res, next) => {
    const allErrorMessages = extractErrorMessages(err);
    res.render('404', { allErrorMessages });
};