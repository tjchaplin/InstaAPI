var mongojs = require('mongojs');

var Mongo = {};

Mongo.Database = function(databaseName){ 
	return mongojs(databaseName);
};

Mongo.Collection = function(database, collectionName){ 
	return database.collection(collectionName);
};

exports.Mongo = Mongo;

exports.locateMongoParameters = function(req){
	return {
		DatabaseName: req.params.databaseName, 
		CollectionName: req.params.collectionName
	};
};

exports.searchCollection = function(endPointCollection, queryParams, callback){
	delete queryParams.databaseName;
	delete queryParams.collectionName;

	endPointCollection.find(queryParams, function(err, results){
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