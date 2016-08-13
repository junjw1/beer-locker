//User Model 만들기

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre('save', function(callback){
    var user = this;
    
    //만약 password가 바뀌지 않았다면 빠져나오기(breat out)
    if(!user.isModified('password')) return callback();

    //패스워드가 바뀌었고 hash를 해야함.
    bcrypt.genSalt(5, function(err, salt){
        if(err) return callback(err);
        
        bcrypt.hash(user.password, salt, null, function(err, hash){
           if(err) return callback(err);
           user.password = hash;
           callback(); 
        });
    });
});

module.exports = mongoose.model('User', userSchema)