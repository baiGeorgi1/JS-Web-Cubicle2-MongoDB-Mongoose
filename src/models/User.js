const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // библиотека за криптиране на пароли


//Генерираме схема за потребителите,в която задаваме нужните данни,за запазване в DB
const userSchema = new mongoose.Schema({
    username: String,
    password: {         //Ще проверим за паролата дали съвпада с рипийдпаса с userSchema.virtual
        type: String,
        // validate: {
        //     validator: function (value) { // value === password защото сме във password полето
        //         return this.repeatPassword === value; // this сочи към документа , който ние създаваме в момента
        //     },
        //     message: `Password missmatch!`  // send mess if password is not the same with repeatPassword
        // }
    }
});
// TODO validate if user exists

//Понеже в схемата нямаме repeatPassword - добавяме виртуално,за да можем да жалидираме паролата
userSchema.virtual('repeatPassword')
    .set(function (value) {
        if (value !== this.password) {
            throw new mongoose.MongooseError('Password Missmatch!');
        }
    });
// преди да сейвнем направи това със pre - има го в nmp google
userSchema.pre('save', async function () {
    const hash = await bcrypt.hash(this.password, 10); // подаваме рундове или сол(някакъв стринг(има си подсказка за hash))
    this.password = hash;
});

const User = mongoose.model('User', userSchema); //Генерирай ми модел,който се казва user от userSchema


module.exports = User;