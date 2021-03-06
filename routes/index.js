﻿'use strict';
var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const Item = require("../models/item");
const User = require("../models/user");

// Mongo connect
let mongo_url = "mongodb://localhost/itemdb"; // db connection string
mongoose.connect(mongo_url)
    .then(() => console.log("Db connection success"))
    .catch(error => console.log("Db connection failed ", error.message));


/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});

// Get Register Page
router.get('/register', function (req, res) {
    res.render('register', { title: 'Register' });
});

router.get('/login', function (req, res) {
    res.render('login', { title: 'Login' });
});

// ad list page
router.get('/adlist', function (req, res) {
    Item.find({}, (error, data) => {
        res.render('adlist', {items : data});
    });
   
});

// for new user
router.get('/signup', function (req, res, next) {
    
    let user = new User({
        mail: req.body.email,
        name: req.body.name,
        password: req.body.password
    });

    user.save((err) => {
        if (err) res.status(500).send({ message: `Err: ${err}` });

        res.status(200).send();
    });
}); 


// Add new item
router.get('/addItem', function (req, res,next) {
    let item = new Item({
        title: "Item 1",
        description: "description",
        price: 50
    });

    item.save((error, data) => {
        if (error) {
            res.send("unexpected fail");
        } else {
            res.json(data);
        }
    });
}); 

router.get("/getItemList", (req, res, next) => {
    Item.find({}, (error, data) => {
        if (error) {
            res.send("Unexpected fail");
        }
        else {
            res.json(data);
        }
    });
});




module.exports = router;
