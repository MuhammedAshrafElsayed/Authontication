'use strict';
const express = require('express');
const route = express.Router();
const userService = require("../services");


const signUp = async (req, res, next) => {
    try {
        // 1-construct username and password from request body
        const { email, passWord } = req.body;
        console.log("creating user: ", email);
        // 2- send to identity server to check/create username and password
        const result = await userService.createUser({ email, passWord });
        console.log("user ", email, " is created successfully");

        // 3- send response
        res.status(201).send(result);
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }

};
const signIn = async (req, res, next) => {
    try {
        const { email, passWord } = req.body;
        console.log("sigining in user: ", email);

        const result = await userService.validate({ email, passWord });

        if (result) {
            console.log("user ", result.email, " is signed in successfully");
            res.status(200).send(result);
            next();
        }
        else {
            console.log("Wrong username or password");
            res.status(404).send("Wrong username or password");
            next();
        }


    } catch (error) {
        console.log(error);
        next(error);
    }

};


route.post("/signup", signUp);
route.post("/signin", signIn);
module.exports = route