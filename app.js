var restify = require('restify'),
	routes = require('./lib/routes');

var app = restify.createServer();
app.use(restify.queryParser());

routes.exposeEndPoints(app);

app.listen(3000, function(){
  console.log('API live at', app.url);
});