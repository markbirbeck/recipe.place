var express = require('express');
var exphbs  = require('express-handlebars');
var fs = require('fs');
var path = require('path');
var app = express();
var config = require('config');
var request = require('request');

var root = __dirname + '/app';

app.engine('handlebars', exphbs({defaultLayout: 'h5bp'}));
app.set('view engine', 'handlebars');

if (config.has('google.siteVerification')){
  var googleSiteVerification = 'google' + config.get('google.siteVerification') + '.html';

  console.log('Adding Google site verification code:', googleSiteVerification);
  app.get('/' + googleSiteVerification, function (req, res){
    res.send('google-site-verification: ' + googleSiteVerification);
  });
}

app.get('/', function (req, res){
  res.render('index', function (err, html){
    res.send(html);
  });
});

app.get('/recipe/:ingredient/:state/:method', function (req, res){
  var params = req.params;

  request.get(config.backend.endpoint + '/recipe/' + params.method, function (err, data){
    if (err){
      res.status(404)
        .render('404', function (err, html){
          res.send(html);
        });
    }else{
      var body = JSON.parse(data.body);

      res.render('recipe', { params: params, recipe: body.recipe },
          function (err, html){
        res.send(html);
      });
    }
  });
});

app.use(express.static(root));

app.use(function(req, res, next){
  res.status(404)
    .render('404', function (err, html){
      res.send(html);
    });
});

var server = app.listen(process.env.PORT || 3000, function (){
  var host = server.address().address;
  var port = server.address().port;

  console.log('Listening at http://%s:%s', host, port);
  console.log('Forwarding to', config.backend.endpoint);
});
