var api = require('./api');

exports.exposeEndPoints = function(app){
	app.get('/:databaseName/:collectionName', function(req, res){
		var endPointCollection = api.getMongoCollection(req);

		api.searchCollection(endPointCollection, req.params, function(results){
			res.send(results);
		});
	});
};