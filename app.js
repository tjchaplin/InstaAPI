var restify = require('restify'),
	routes = require('./lib/routes'),
	mongo = require('./lib/mongoParser');

var app = restify.createServer();
app.use(restify.queryParser());
app.use(mongo.mongoQueryParser);

routes.exposeEndPoints(app);

app.listen(3000, function(){
  console.log('API live at', app.url);
});