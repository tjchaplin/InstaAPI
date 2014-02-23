var mongojs = require('mongojs');

exports.getMongoCollection = function(req){
	var database = mongojs(req.mongo.database);
	var collection = database.collection(req.mongo.collection);
	return collection;
};

exports.searchCollection = function(endPointCollection, queryParams, callback){
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