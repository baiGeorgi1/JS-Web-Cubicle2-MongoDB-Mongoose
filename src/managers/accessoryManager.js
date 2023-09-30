const Accessory = require('../models/accessoryModel');

exports.getAll = () => Accessory.find();

exports.create = (accessoryData) => Accessory.create(accessoryData); //По-добрият вариант за създаване ot (виж cubeManager)
exports.getOthers = (accessoryIds) => Accessory.find({ _id: { $nin: accessoryIds } }); // $nin (Not-IN) e оператор ,който иска да не се съдържат ст-сте от даден масив