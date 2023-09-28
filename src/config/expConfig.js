const express = require('express');
const path = require('path');

function expConfigurator(app) {
    // app.use(express.static('src/public')); //if not working use the next line...
    app.use(express.static(path.resolve(__dirname, '../public')));
    app.use(express.urlencoded({ extended: false })); // add body parser

}
module.exports = expConfigurator


