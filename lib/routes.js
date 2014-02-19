var api = require('./api');

exports.exposeEndPoints = function(app){
	app.get('/:databaseName/:collectionName', function(req, res){
		var mongoParams = api.locateMongoParameters(req);

		var queryDatabase = api.Mongo.QueryDatabase(mongoParams.DatabaseName);
		var queryCollection = api.Mongo.QueryCollection(queryDatabase, mongoParams.CollectionName);

		api.searchCollection(queryCollection, req.params, function(results){
			res.send(results);
		});
	});
};