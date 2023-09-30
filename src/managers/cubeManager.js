const uniqId = require('uniqid');
const Cube = require('../models/Cube');


exports.getAll = async (search, from, to) => {
    let result = await Cube.find().lean();
    //TO DO use mongoose to filter in db
    if (search) {
        result = result.filter(cube => cube.name.toLowerCase().includes(search.toLowerCase()));

    } else if (from) {
        result = result.filter(cube => cube.difficultyLvl >= Number(from));
    } else if (to) {
        result = result.filter(cube => cube.difficultyLvl <= Number(to));
    }
    return result;
};
exports.getById = (cubeId) => Cube.findById(cubeId);// .lean() ако искам да върне обект

// ********* create cube on mongoDB 1-variant (async-await)
// exports.create = async (cubeData) => {
//     const cube = new Cube(cubeData);

//     await cube.save(); //saving on mongoDb
//     return cube;
// };
// ******** second variant
exports.create = (cubeData) => {
    const cube = new Cube(cubeData);

    return cube.save(); //saving on mongoDb
}; 