var api = require('./api');

exports.exposeEndPoints = function(app){
	app.get('/Info', function(req, res, next){
		res.render('Index', { APIName: 'My API' });
	});

	app.get('/:databaseName/:collectionName', function(req, res){
		var endPointCollection = api.getMongoCollection(req);

		api.searchCollection(endPointCollection, req.query, function(results){
			res.send(results);
		});
	});
};