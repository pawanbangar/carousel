const mongoose = require('mongoose');

const CategorySchhema = new mongoose.Schema({
    name:  String,
    count:Number
});

module.exports = Category = mongoose.model("Model",  CategorySchhema,'category');