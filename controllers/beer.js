//beer locker part 3!! Passport

//패키지 로드하기
var Beer = require('../models/beer');

//POST를 위한 엔드포인트 /api/beers 생성
exports.postBeers = function(req, res){
    //Beer model의 새 인스터스 생성
    var beer = new Beer();

    //POST 데이터로부터 온 beer 프로퍼티들을 셋
    beer.name = req.body.name;
    beer.type = req.body.type;
    beer.quantity = req.body.quantity;

    //beer 저장과 에러 체크
    beer.save(function(err){
        if(err) res.send(err);
        res.json({ message: 'beer added to the locker!', data: beer});
    });
};

//GET을 위한 엔드포인트 /api/beers 생성하기
exports.getBeers = function(req, res){
    
    //모든 beer를 찾기위한 Beer 모델 사용
    Beer.find(function(err, beers){
        if(err) res.send(errr);
        res.json(beers);
    });

};

//GET을 위한 엔드포인트 /api/beers/:beer_id 생성하기
exports.getBeer = function(req, res){
    Beer.findById(req.params.beer_id, function(err,beer){
        if(err) res.send(err);
        res.json(beer);
    });
};

//PUT을 위한 엔드포인트 /api/beers/:beer_id 생성하기
exports.putBeer = function(req, res){
    Beer.findById(req.params.beer_id, function(err, beer){
        if(err) res.send(err);

        beer.quantity = req.body.quantity;

        beer.save(function(err){
            if(err)res.send(err);
            res.json(beer);
        });
    });
};

//DELETE를 위한 엔드포인트 /api/beers/:beer_id 생성하기
exports.deleteBeer = function(req, res){
    Beer.findByIdAndRemove(req.params.beer_id, function(err){
        if(err)res.send(err);
        res.json( {message: 'beer removed from the locker!'} );
    });
};