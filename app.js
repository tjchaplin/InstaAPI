var restify = require('restify'),
	routes = require('./routes');

var app = restify.createServer();

app.use(restify.queryParser());
routes.exposeEndPoints(app);

app.listen(3000, function() {
  console.log('API Live', app.url);
});