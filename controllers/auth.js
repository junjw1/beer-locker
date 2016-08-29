// 인증 관리하는 auth 컨트롤러
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var User = require('../models/user');

passport.use(new BasicStrategy(
    function(username, password, callback){
        User.findOne({ username: username }, function(err, user){
            if(err){
                return callback(err);
            }
            //해당 username으로 사용자를 찾을 수 없을 때
            if(!user){
                return callback(null, false);
            }
            // 패스워드가 맞는지 확인하기
            user.verifyPassword(password, function(err, isMatch){
                if(err){
                    return callback(err);
                }
                
                //패스워드가 불일치하다면
                if(!isMatch){
                    return callback(null, false);
                }
                //성공
                return callback(null, user);
            });
        });
    }
));

exports.isAuthenticated = passport.authenticate('basic', { session: false });
