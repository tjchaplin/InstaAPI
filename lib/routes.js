var api = require('./api'),
	mongo = require('./mongoParser');

exports.exposeEndPoints = function(app){
	app.get('/', function(req, res, next){
		res.render('Index', { APIName: 'Insta API' });
	});

	app.get('/:databaseName/:collectionName', mongo.mongoQueryParser, function(req, res, next){
		var endPointCollection = api.getMongoCollection(req);
		api.searchCollection(endPointCollection, req.query, function(results){
			res.send(results);
		});
	});
};