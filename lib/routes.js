var api = require('./api');

exports.exposeEndPoints = function(app){
	app.get('/:databaseName/:collectionName', function(req, res){
		var mongoParams = api.locateMongoParameters(req);

		var endPointDatabase = api.Mongo.Database(mongoParams.DatabaseName);
		var endPointCollection = api.Mongo.Collection(endPointDatabase, mongoParams.CollectionName);

		api.searchCollection(endPointCollection, req.params, function(results){
			res.send(results);
		});
	});
};