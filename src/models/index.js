"use strict";

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

const User = new mongoose.Schema(
    {
        email: {
            type: String,
            lowerCase: true,
            required: [true, "please enter a valid email"],
            unique: true,
            index: true
        },
        passWord: { type: String, required: true }
    }
);
User.pre('save', function (next) {
    var user = this;

    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.passWord, salt, function (err, hash) {
            if (err) return next(err);
            user.passWord = hash;
            next();
        });
    });
});

User.methods.comparePassword = async function comparePassword(data) {
    return bcrypt.compare(data, this.passWord);
}
const user = mongoose.model('User', User);
user.createIndexes();

module.exports = user;