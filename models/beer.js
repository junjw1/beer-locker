var mongoose = require('mongoose');

//우리 맥주 스키마 정의

var BeerSchema = new mongoose.Schema({
    name: String,
    type: String,
    quantity: Number
});

module.exports = mongoose.model('Beer', BeerSchema);
