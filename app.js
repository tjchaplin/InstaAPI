var express = require('express'),
	routes = require('./lib/routes'),
	mongo = require('./lib/mongoParser');

var app = express();

app.use(mongo.mongoQueryParser);

routes.exposeEndPoints(app);
app.use(app.router);

// app.use(express.static(__dirname + '/public/'));
// app.set('views', __dirname + '/views');
// app.set('view engine', 'jade');
// app.set('port', process.env.PORT || 3000);

app.listen(3000, function(){
  console.log('API live at', app.url);
});