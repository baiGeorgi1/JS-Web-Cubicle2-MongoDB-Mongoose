const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // библиотека за криптиране на пароли


//Генерираме схема за потребителите,в която задаваме нужните данни,за запазване в DB
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required!'],           // Това е Mongoose Validation
        minLength: [5, 'Password should be min 5 characters!'],           // Това е Mongoose Validation
        match: /^[A-Za-z0-9]+$/,   // Това е Mongoose Validation with RegExp
        unique: true               //Това не е валидация,а ИНДЕКС(работи като валидатор,и търси по  _id)

    },
    password: {         //Ще проверим за паролата дали съвпада с рипийдпаса с userSchema.virtual
        type: String,
        // MONGOOSE VALIDATION
        required: [true, 'Required password!'], // можем да добавяме месиджи
        validate: {
            validator: function (value) { // value === password защото сме във password полето
                return /^[A-Za-z0-9]+$/.test(value); // по-лесен начин за валидация

                // return this.repeatPassword === value; // this сочи към документа , който ние създаваме в момента
            },
            message: `Invalid password characters!`  // send mess if password is not the same with repeatPassword
        },
        minLength: 8,
    },
});
// TODO validate if user exists

//Понеже в схемата нямаме repeatPassword - добавяме виртуално,за да можем да жалидираме паролата
userSchema.virtual('repeatPassword')
    .set(function (value) {
        if (value !== this.password) {
            throw new mongoose.MongooseError('Password Missmatch!');
        }
    });
// Validate Hooks
// преди да сейвнем направи това със pre - има го в nmp google
userSchema.pre('save', async function () {
    const hash = await bcrypt.hash(this.password, 10); // подаваме рундове или сол(някакъв стринг(има си подсказка за hash))
    this.password = hash;
});

const User = mongoose.model('User', userSchema); //Генерирай ми модел,който се казва user от userSchema


module.exports = User;