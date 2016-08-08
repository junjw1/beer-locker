//필요한 패키지 가져오기. express를 우리 앱 내에서 쓸 수 있다.
var express = require('express');

//express 앱 생성. 우리 웹앱 컴포넌트의 메인 컴포넌트
//app으로 route를 정의하고 http연결을 듣기시작한다.
var app = express();

//포트 지정하기
var port = process.env.PORT || 3000;

//express 라우터(router) 생성. 라우터는 하나의 작은 앱으로 생각할 수 있다.
//모든 express앱은 내장된(builtin) 앱 라우터를 가지고 있다. 라우터는 미들웨어처럼 행동 
var router = express.Router();

//라우트 생성. '/'을 위한 라우트를 만들고, 'json 객체(object)'를 리턴 
router.get('/', function(req, res){
   res.json({ message: 'you are running dangerously low on beer!' }); 
});

// '/api'에 모든 우리 라우트들을 등록하자(register 무엇을 with 여기에)
// 우리가 이전에 정의했던 라우트(routes)를 앱에 지정하자. prefix '/api'를 사용해서.
// 모든 정의된 라우트(route)들이 '/api'로 prefix될 것라는 의미
app.use('/api', router);

// 서버 시작. '들어오는 연결과 요청'에 대해 듣기 시작한다.
app.listen(port);

console.log('insert beer on port ' + port);

