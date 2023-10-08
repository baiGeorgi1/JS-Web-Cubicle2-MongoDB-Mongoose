const mongoose = require('mongoose');
//Генерираме схема за потребителите,в която задаваме нужните данни,за запазване в DB
const userSchema = new mongoose.Schema({
    username: String,
    password: {         //Ще проверим за паролата дали съвпада с рипийдпаса
        type: String,
        // validate: {
        //     validator: function (value) { // value === password защото сме във password полето
        //         return this.repeatPassword === value; // this сочи към документа , който ние създаваме в момента
        //     },
        //     message: `Password missmatch!`  // send mess if password is not the same with repeatPassword
        // }
    }
});
userSchema.virtual('repeatPassword')
    .set(function (value) {
        if (value !== this.password) {
            throw new mongoose.MongooseError('Password Missmatch!');
        }
    });

const User = mongoose.model('User', userSchema); //Генерирай ми модел,който се казва user от userSchema


module.exports = User;