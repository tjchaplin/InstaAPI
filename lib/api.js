var mongojs = require('mongojs');

var mongo = {};

mongo.QueryDatabase = function(databaseName){ 
	return mongojs(databaseName);
};

mongo.QueryCollection = function(database, collectionName){ 
	return database.collection(collectionName);
};

exports.Mongo = mongo;

exports.locateMongoParameters = function(req){
	return { 
		DatabaseName: req.params.databaseName, 
		CollectionName: req.params.collectionName 
	};
};

exports.searchCollection = function(queryCollection, queryParams){
	delete queryParams.databaseName;
	delete queryParams.collectionName;
	var apiResponse;

	queryCollection.find(queryParams, function(err, results){
		apiResponse = results;
	});

	return apiResponse;
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