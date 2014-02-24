var express = require('express'),
	routes = require('./lib/routes'),
	apiStatus = require('./lib/apiStatus');

var app = express();
app.use(app.router);

app.use(express.static(__dirname + '/public/'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('port', process.env.PORT || 3000);

apiStatus.monitorAPI(app);
routes.exposeEndPoints(app);



console.log('API Live on port 3000\nsocket.io initialised.')

