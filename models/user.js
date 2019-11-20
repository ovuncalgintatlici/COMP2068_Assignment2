// user model

const mongoose = require("mongoose");

module.exports = mongoose.model("Users", new mongoose.Schema({
    name: String,
    password: String,
    mail: String
}));