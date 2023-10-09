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
exports.getById = (cubeId) => Cube.findById(cubeId).populate('accessories');// .lean() ако искам да върне обект

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
//part 3 edit cube
exports.update = (cubeId, cubeData) => Cube.findByIdAndUpdate(cubeId, cubeData);
//part 3 delete
exports.delete = (cubeId) => Cube.findByIdAndDelete(cubeId);


//part 2 вариант1 за пушване на аксесори в куб
exports.attachAccessory = async (cubeId, accessoryId) => {
    return Cube.findByIdAndUpdate(cubeId, { $push: { accessories: accessoryId } }); // тук пушваме в схемата на кубът новия аксесоар
    // вариант 2
    // const cube = await Cube.findById(cubeId);
    // cube.accessories.push(accessoryId);
    // return cube.save();
};

