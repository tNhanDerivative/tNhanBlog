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



userSchema.pre('save', function(next) {
    const user = this;
    const saltRounds = 10;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(saltRounds, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
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