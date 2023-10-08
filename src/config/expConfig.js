const express = require('express');
const path = require('path');
const cookie = require('cookie-parser'); // cookie library

const { auth } = require('../middlewares/authMiddleware');  // Part 3 workshop

function expConfigurator(app) {
    // app.use(express.static('src/public')); //if not working use the next line...
    app.use(express.static(path.resolve(__dirname, '../public')));// Part 1 workshop
    app.use(express.urlencoded({ extended: false })); // add body parser
    app.use(cookie()); //Part 3 workshop
    app.use(auth); //Part 3 workshop


}
module.exports = expConfigurator


