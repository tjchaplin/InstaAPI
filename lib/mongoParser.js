mongoConverter = require('./mongoParameterConverter');

module.exports = {
    mongoQueryParser: function(req, res, next){
		
		if (req.url.indexOf('/Info') !== -1){
			next();
		}
		else{
			mongoRouteParams();
			mongoQueryParams();
			next();
		}
		
		function mongoRouteParams(){
			req.mongo = {};
			var routes = req.url.split('/');
			req.mongo.database = routes[1];

			if (routes[2].indexOf('?') !== 1){
				var detachQueryFromCollection = routes[2].split('?');
				req.mongo.collection = detachQueryFromCollection[0];
			}
			else{
				req.mongo.collection = routes[2];
			}
		}

		function mongoQueryParams(){
			for (var param in req.query){
				if(req.query[param].indexOf('[') !== -1){
					req.query[param] = mongoConverter.inObject(req.query[param]);
					continue;
				}
				
				else if(param.indexOf(' gt ') !== -1){
					delete req.query[param];
					var gtParamPieces = param.split(' ');
					req.query[gtParamPieces[0]] = mongoConverter.gtObject(gtParamPieces[2]);
					continue;
				}

				else if(param.indexOf(' lt ') !== -1){
					delete req.query[param];
					var ltParamPieces = param.split(' ');
					req.query[ltParamPieces[0]] = mongoConverter.ltObject(ltParamPieces[2]);
					continue;
				}

				else if(req.query[param].indexOf('contains(') !== -1){
					var containsValue = req.query[param].toString().replace('contains(','').replace(')','');
					req.query[param] = mongoConverter.containsObject(containsValue);
					continue;
				}
			}
		}
	}
}