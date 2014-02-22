mongoConverter = require('./mongoParameterConverter');

module.exports = {
    mongoQueryParser: function(req, res, next){

			for (var param in req.params){
				if(req.params[param].indexOf('[') !== -1){
				req.params[param] = mongoConverter.inObject(req.params[param]);
				continue;
			}
				
			else if(param.indexOf(' gt ') !== -1){
				delete req.params[param];
				var gtParamPieces = param.split(' ');
				req.params[gtParamPieces[0]] = mongoConverter.gtObject(gtParamPieces[2]);
				continue;
			}

			else if(param.indexOf(' lt ') !== -1){
				delete req.params[param];
				var ltParamPieces = param.split(' ');
				req.params[ltParamPieces[0]] = mongoConverter.ltObject(ltParamPieces[2]);
				continue;
			}

			else if(req.params[param].indexOf('contains(') !== -1){
				var containsValue = req.params[param].toString().replace('contains(','').replace(')','');
				req.params[param] = mongoConverter.containsObject(containsValue);
				continue;
			}
		}
		next();
    }
};

