const mongoose = require('mongoose');

//creating cube schema 
const cubeSchema = new mongoose.Schema({
    name: String,
    description: String,
    imageUrl: String,
    difficultyLvl: Number,
    //връзка с db на аксесоарите
    //ако връзката е САМО за един аксесоар,подаваме без '[]' скоби!!!
    accessories: [{
        type: mongoose.Types.ObjectId,
        ref: 'Accessory'
    }]
});
// creating cube model (Always with Upper case)
const Cube = mongoose.model('Cube', cubeSchema);
module.exports = Cube;