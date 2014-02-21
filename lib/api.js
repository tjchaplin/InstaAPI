var mongojs = require('mongojs'),
	oData = require('./openData').OpenData;

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

	for (var param in queryParams){
		if(queryParams[param].indexOf('[') !== -1)
			queryParams[param] = oData.inObject(queryParams[param]);

		if(param.indexOf(' gt ') !== -1){
			delete queryParams[param];
			var gtParamPieces = param.split(' ');
			queryParams[gtParamPieces[0]] = oData.gtObject(gtParamPieces[2]);
		}

		if(param.indexOf(' lt ') !== -1){
			delete queryParams[param];
			var ltParamPieces = param.split(' ');
			queryParams[ltParamPieces[0]] = oData.ltObject(ltParamPieces[2]);
		}

		if(queryParams[param].indexOf('contains(') !== -1){
			var containsValue = queryParams[param].toString().replace('contains(','').replace(')','');
			queryParams[param] = oData.containsObject(containsValue);
		}
	}

	console.log(queryParams);

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