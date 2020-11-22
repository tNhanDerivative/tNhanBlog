const { isEmail: isEmail } = require('validator');
const bcrypt = require('bcrypt');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: {
        type: String,
        required: true 
    },
    snipet: {
        type: String,
        required: true 
    },
    body: {
        type: String,
        required: true 
    }
},{timestamps: true});

const userSchema = new Schema({
    email: {
        type: String,
        required: [true,'Please enter your email'],
        unique: [true,'This email has already been registered'],
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Please enter the password'],
        minlength: [6, 'Password minimum length is 6 Character']
    },
    tasks: [taskSchema]
},{timestamps: true});



userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({
        email
    });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
};

const User = mongoose.model('users',userSchema);
module.exports = User;