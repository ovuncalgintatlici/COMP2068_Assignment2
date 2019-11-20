const mongoose = require("mongoose");

module.exports = mongoose.model("Items", new mongoose.Schema({
    title: String,
    description: String,
    price: Number
}));