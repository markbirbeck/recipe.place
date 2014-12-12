var express = require('express');
var exphbs  = require('express-handlebars');
var fs = require('fs');
var path = require('path');
var app = express();

var root = __dirname + '/app';

app.engine('handlebars', exphbs({defaultLayout: 'h5bp'}));
app.set('view engine', 'handlebars');

app.get('/', function (req, res){
  res.render('index', function (err, html){
    res.send(html);
  });
});

app.get('/recipe/:ingredient/:state/:method', function (req, res){
  var params = req.params;
  var recipe = path.join(__dirname, 'data', 'recipe', params.ingredient,
    params.state, params.method + '.json');

  fs.readFile(recipe, function (err, data){
    if (err){
      res.status(404)
        .render('404', function (err, html){
          res.send(html);
        });
    }else{
      res.render('recipe', { params: params, recipe: JSON.parse(data) },
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
});
