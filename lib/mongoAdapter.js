var mongojs = require('mongojs'),
	mongoConverter = require('./mongoParameterConverter');

var MongoAdapter = {};

MongoAdapter.getParameters = function(req){
	return { 
		DatabaseName: req.params.databaseName, 
		CollectionName: req.params.collectionName 
	};
};

MongoAdapter.getDatabase = function(databaseName){ 
	return mongojs(databaseName);
};

MongoAdapter.getCollection = function(database, collectionName){ 
	return database.collection(collectionName);
};

MongoAdapter.queryConverter = function(req){
	var queryParams = req.params;
	delete queryParams.databaseName;
	delete queryParams.collectionName;

	for (var param in queryParams){
		if(queryParams[param].indexOf('[') !== -1){
			queryParams[param] = mongoConverter.inObject(queryParams[param]);
			continue;
		}
			
		else if(param.indexOf(' gt ') !== -1){
			delete queryParams[param];
			var gtParamPieces = param.split(' ');
			queryParams[gtParamPieces[0]] = mongoConverter.gtObject(gtParamPieces[2]);
			continue;
		}

		else if(param.indexOf(' lt ') !== -1){
			delete queryParams[param];
			var ltParamPieces = param.split(' ');
			queryParams[ltParamPieces[0]] = mongoConverter.ltObject(ltParamPieces[2]);
			continue;
		}

		else if(queryParams[param].indexOf('contains(') !== -1){
			var containsValue = queryParams[param].toString().replace('contains(','').replace(')','');
			queryParams[param] = mongoConverter.containsObject(containsValue);
			continue;
		}
	}
	return queryParams;
}

exports.MongoAdapter = MongoAdapter;