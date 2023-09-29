const mongoose = require('mongoose');

//creating cube schema 
const cubeSchema = new mongoose.Schema({
    name: String,
    description: String,
    imageUrl: String,
    difficultyLvl: Number,
});
// creating cube model (Always with Upper case)
const Cube = mongoose.model('Cube', cubeSchema);
module.exports = Cube;