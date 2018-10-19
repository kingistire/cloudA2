var express = require('express')
  , app = express()
  , http = require('http')
  , server = http.createServer(app)
  ,Twit = require('twit')
  , io = require('socket.io').listen(server);

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Tweeeeeeeeeeeeeeeeeeeets' });
});
\\

router.post('/', function(req, res, next){
  var watchList = ['love', 'hate'];
  var T = new Twit({
     consumer_key:         'EdzJjKYk4FKHiy8HPnMpmCbQH'
   , consumer_secret:      'qp4TB7Tqem9NViFwHJ51vpmAWwasc2sI2Ji4Ci12Kcq7mzXqGQ'
   , access_token:         '835238610672574464-a8z7KkpXYMNyfAHpARE8oEKEGrR7sPT'
   , access_token_secret:  'H7A9Dwaef2kkRFE7pk1ayE0LI1wTVPesSTbVWutFwaU62'
  });

io.sockets.on('connection', function (socket) {
  console.log('Connected');


 var stream = T.stream('statuses/filter', { track: watchList })

  stream.on('tweet', function (tweet) {

    io.sockets.emit('stream',tweet.text);


  });
 });
});

module.exports = router;
