//user와 추가된 user를 보기위한 controller
var User = require('../models/user');

//POST를 위한 엔드포인트 /api/users 생성
exports.postUsers = function(req, res){
    var user = new User({
        username: req.body.username,
        password: req.body.password
    });

    user.save(function(err){
        if(err) res.send(err);
        res.json({message: 'new beer drinker added to the locker room!'});
    });
};

//GET을 위한 엔드포인트 /api/users 생성
exports.getUsers = function(req, res){
    User.find(function(err, users){
        if(err) res.send(err);
        res.json(users);
    });
};