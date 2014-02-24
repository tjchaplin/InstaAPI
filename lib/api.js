var mongojs = require('mongojs'),
	apiStatus = require('./apiStatus');

exports.getMongoCollection = function(req){
	var database = mongojs(req.mongo.databaseName);
	var collection = database.collection(req.mongo.collectionName);
	apiStatus.updateRequestTargets(req.mongo.databaseName, req.mongo.collectionName);
	
	return collection;
};

exports.searchCollection = function(endPointCollection, queryParams, callback){
	endPointCollection.find(queryParams, function(err, results){
		err === undefined ? apiStatus.incrementUnsuccessfulRequests() : apiStatus.incrementSuccessfulRequests();
		apiStatus.incrementTotalRequests();
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