var api = require('./api'),
	mongo = require('./mongoAdapter').MongoAdapter;

exports.exposeEndPoints = function(app){
	app.get('/:databaseName/:collectionName', function(req, res){
		var mongoParams = mongo.getParameters(req);

		var endPointDatabase = mongo.getDatabase(mongoParams.DatabaseName);
		var endPointCollection = mongo.getCollection(endPointDatabase, mongoParams.CollectionName);

		var queryObject = mongo.queryConverter(req);
		api.searchCollection(endPointCollection, queryObject, function(results){
			res.send(results);
		});
	});
};