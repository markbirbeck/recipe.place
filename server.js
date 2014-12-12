var express = require('express');
var exphbs  = require('express-handlebars');
var fs = require('fs');
var app = express();

var root = __dirname + '/app';

app.engine('handlebars', exphbs({defaultLayout: 'h5bp'}));
app.set('view engine', 'handlebars');

app.get('/', function (req, res){
  res.render('index', function (err, html){
    res.send(html);
  });
});

app.get('/recipe/chicken/whole/roast', function (req, res){
  fs.readFile(__dirname + '/data/recipe/chicken/whole/roast.json', function (err, data){
    if (err){
      res.status(404)
        .render('404', function (err, html){
          res.send(html);
        });
    }else{
      res.render('recipe', JSON.parse(data), function (err, html){
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
