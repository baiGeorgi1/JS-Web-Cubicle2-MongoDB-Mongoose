const mongoose = require('mongoose');
//mongoose connect
const uri = 'mongodb://127.0.0.1:27017/cubicle-sept-2023';

//mongoose connect func
async function dbConnect() {
    await mongoose.connect(uri);

}
module.exports = dbConnect;