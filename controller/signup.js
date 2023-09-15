const { log } = require('console');
const express = require('express');
const User = require('../model/user');

async function signUp(req,res) {
    try {
        //validate if password does not match with confirm password then data won't store
        const { password, confirmPassword,phone } = req.body;
        if (password !== confirmPassword) {
            return res.status(400).send("Password don't match");
        }
        if (phone.length > 10) {
            return res.status(400).send("phone number has more than 10 digit");
        }
        const createUser = new User(req.body);
        const insertUser = await createUser.save();
        console.log(insertUser);
        res.status(200).send(insertUser);
    } catch (err) {
        console.log("Error while posting data", err);
        res.status(400).send(err);
    }
    
}
module.exports = {signUp };