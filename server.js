var express = require('express');
var app = express();

var root = __dirname + '/app';

app.get('/', function (req, res){
  res.sendFile(root + '/index.html');
});

app.get('/recipe/chicken/whole/roast', function (req, res){
  res.sendFile(root + '/recipe/chicken/whole/roast.html');
});

app.use(express.static(root));

app.use(function(req, res, next){
  res.status(404)
    .sendFile(root + '/404.html');
});

var server = app.listen(3000, function (){
  var host = server.address().address;
  var port = server.address().port;

  console.log('Listening at http://%s:%s', host, port);
});
