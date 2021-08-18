"use strict";
const User = require("../models");

const createUser = async user => {
    const newUser = new User(user);
    return await newUser.save();
};

const validate = async user => {
    const userResult = await User.findOne({ email: user.email });
    const isValidPassword = await userResult?.comparePassword(user.passWord);
    console.log("check password ", user, isValidPassword);
    if (!isValidPassword) return null;
    return userResult;
};
module.exports = { createUser, validate }