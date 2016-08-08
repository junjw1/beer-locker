//필요한 패키지 가져오기. express를 우리 앱 내에서 쓸 수 있다.
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Beer = require('./models/beer');

//beer-locker를 mongoDB에 연결하기
mongoose.connect('mongodb://localhost:27017/beerlocker');


//'express 앱' 생성. 우리 웹앱 컴포넌트의 메인 컴포넌트
//app으로 route를 정의하고 http연결을 듣기시작한다.
var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

//포트 지정하기
var port = process.env.PORT || 3000;

//express 라우터(router) 생성. 라우터는 하나의 작은 앱으로 생각할 수 있다.
//모든 express앱은 내장된(builtin) 앱 라우터를 가지고 있다. 라우터는 미들웨어처럼 행동 
var router = express.Router();

//라우트 생성. '/'을 위한 라우트를 만들고, 'json 객체(object)'를 리턴 
router.get('/', function(req, res){
   res.json({ message: 'you are running dangerously low on beer!!!~!~~!!~' }); 
});

//prefix가 /beers인 새 라우트 생성. 
var beersRoute = router.route('/beers');

//POST를 위한 '/api/beers' 엔드포인트(endpoint) 생성.
beersRoute.post(function(req, res){
    /*우리가 엔드포인트에 POST할 때, 무엇을 할지 이 블록 안에 셋팅한다(setting up)*/


    //Beer모델의 새 인스턴스 생성
    var beer = new Beer();

    //POST 데이터로부터 온 맥주 속성들(beer properties)을 셋
    beer.name = req.body.name;
    beer.type = req.body.type;
    beer.quantity = req.body.quantity;

    //맥주를 저장하고 에러를 체크
    beer.save(function(err){
        if(err){
            res.send(err);
        }
        res.json({message: 'beer added to the locker!!', data: beer});
    });


});

//GET을 위한 '/api/beers' 엔드포인트 생성
beersRoute.get(function(req, res){
    //모든 맥주를 찾기위해 맥주모델을 사용하자
    Beer.find(function(err, beers){
        if(err){
            res.send(err);
        }
        res.json(beers);
    });
});

// '/beers/:beer_id'가 prefix인 새 라우트 생성. 
var beerRoute = router.route('/beers/:beer_id');

// GET을 위한 엔드포인트 '/api/beers/:beer_id' 만들기, 
beerRoute.get(function(req, res){
    Beer.findById(req.params.beer_id, function(err, beer){
        if(err){
            res.send(err);
        }
        res.json(beer);
    });
});

// PUT을 위한 엔드포인트 '/api/beers/:beer_id' 만들기
beerRoute.put(function(req, res){
    //특정 맥주를 찾기 위해 맥주모델 사용
    Beer.findById(req.params.beer_id, function(err, beer){
        if(err){
            res.send(err);
        }

        //남은 맥주양 업데이트하기
        beer.quantity = req.body.quantity;

        //맥주 저장하고 에러 체크
        beer.save(function(){
            if(err){
                res.send(err);
            }
            res.json(beer);
        });
    });
});

// DELETE를 위한 엔드포인트 '/api/beers/:beer_id' 생성
beerRoute.delete(function(req, res){
    //mongoose의 function인 findByIdAndRemove로 찾고 삭제하자.
    Beer.findByIdAndRemove(req.params.beer_id, function(err){
        if(err){
            res.send(err);
        }
        res.json({message: 'beer removed from the locker!!'});

    });
});

// '/api'에 모든 우리 라우트들을 등록하자(register 무엇을 with 여기에)
// 우리가 이전에 정의했던 라우트(routes)를 앱에 지정하자. prefix '/api'를 사용해서.
// 모든 정의된 라우트(route)들이 '/api'로 prefix될 것라는 의미
app.use('/api', router);

// 서버 시작. '들어오는 연결과 요청'에 대해 듣기 시작한다.
app.listen(port);

console.log('insert beer on port ' + port);


