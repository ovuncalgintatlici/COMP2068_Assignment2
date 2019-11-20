'use strict';
var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const Item = require("../models/item");

// Mongo connect
let mongo_url = "mongodb://localhost/itemdb"; // db connection string
mongoose.connect(mongo_url)
    .then(() => console.log("Db connection success"))
    .catch(error => console.log("Db connection failed ", error.message));


/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});

router.get('/register', function (req, res) {
    res.render('register', { title: 'Register' });
});

// ad list page
router.get('/adlist', function (req, res) {
    Item.find({}, (error, data) => {
        res.render('adlist', {items : data});
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
