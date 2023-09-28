const uniqId = require('uniqid');
const cubes = [
    {
        id: "HTB1CSddXRxRMKJjy0Fdq6yifFXa6",
        image: "https://ae01.alicdn.com/kf/HTB1CSddXRxRMKJjy0Fdq6yifFXa6/Gan-356-Air-SM-3x3-Black-Magic-cube-GAN-Air-SM-Magnetic-3x3x3-Speed-cube-gans.jpg",
        name: "Gan356 Air SM",
        difficultyLvl: "3",
        description: "Magnets in AirSM will not drop, and their positions will be more precise with the Magnets-Snap-On design. With the use of 3mm*2mm magnets, the handfeel will be more stable and more comfortable. P.S.This design is brand new for the AirSM"
    }, {
        id: "HTB1CSddXRxRMKJjy0Fdq6yifFXa5",
        image: "https://thingsidesire.com/wp-content/uploads/2018/06/Eco-Dark-Rubik%E2%80%99s-Cube2.jpg",
        name: "Eco-Dark",
        difficultyLvl: "6",
        description: "Magnets in AirSM will not drop, and their positions will be more precise with the Magnets-Snap-On design.",

    }, {
        id: "HTB1CSddXJjy0Fdq6yifFXa5",
        image: "https://images-na.ssl-images-amazon.com/images/I/61izOzq%2BBAL._SY355_.jpg",
        name: "Pyraminx",
        difficultyLvl: "1",
        description: " With the use of 3mm*2mm magnets, the handfeel will be more stable and more comfortable. P.S.This design is brand new for the AirSM",

    }, {
        id: "HTB1CSddXJjy0Fdq6yifFXa6",
        image: "https://images-na.ssl-images-amazon.com/images/I/61HpQqVQ37L._SY355_.jpg",
        name: "Megaminx",
        difficultyLvl: "3",
        description: "Magnets in AirSM will not drop, and their positions will be more precise with the Magnets-Snap-On design. With the use of 3mm*2mm magnets, the handfeel will be more stable and more comfortable.",
    },
];
exports.getAll = (search, from, to) => {
    let result = cubes.slice();

    if (search) {
        result = result.filter(cube => cube.name.toLowerCase().includes(search.toLowerCase()));

    } else if (from) {
        result = result.filter(cube => cube.difficultyLvl >= Number(from));
    } else if (to) {
        result = result.filter(cube => cube.difficultyLvl <= Number(to));
    }
    return result;
};
exports.getById = (cubeId) => {
    const found = cubes.find(x => x.id === cubeId);
    console.log(found);
    return found;
};


exports.create = (cubeData) => { //or allData as name,description,difficultyLVL,image

    const newCube = {
        id: uniqId(),
        ...cubeData
    };
    cubes.push(newCube);

    return newCube;
}; 