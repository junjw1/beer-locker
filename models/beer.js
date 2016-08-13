var mongoose = require('mongoose');

//우리 맥주 스키마 정의

var BeerSchema = new mongoose.Schema({
    name: String,
    type: String,
    quantity: Number
});

//몽구즈 비어 모델을 수출(export). 모델 이름이 'Beer'
module.exports = mongoose.model('Beer', BeerSchema);
