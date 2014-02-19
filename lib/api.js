var mongojs = require('mongojs');

var Mongo = {};

Mongo.QueryDatabase = function(databaseName){ 
	return mongojs(databaseName);
};

Mongo.QueryCollection = function(database, collectionName){ 
	return database.collection(collectionName);
};

exports.Mongo = Mongo;

exports.locateMongoParameters = function(req){
	return { 
		DatabaseName: req.params.databaseName, 
		CollectionName: req.params.collectionName
	};
};

exports.searchCollection = function(queryCollection, queryParams, callback){
	delete queryParams.databaseName;
	delete queryParams.collectionName;

	queryCollection.find(queryParams, function(err, results){
		callback(results);
	});
};

exports.checkQueryParams = function(queryParams, doc){
	var invalidParameters = [];
	for(var queryParam in queryParams){
		var isValid = doc[queryParam];
		if(!isValid)
			invalidParameters.push(queryParam);
	}
	return invalidParameters;
};