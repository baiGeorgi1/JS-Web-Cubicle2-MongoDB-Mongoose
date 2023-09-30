const Accessory = require('../models/accessoryModel');

exports.getAll = () => Accessory.find();

exports.create = (accessoryData) => Accessory.create(accessoryData); //По-добрият вариант за създаване ot (виж cubeManager)