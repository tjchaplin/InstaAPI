exports.inObject = function(inParams){
	var inObject = { $in: [] };
	var params = inParams.replace('[','').replace(']','');
	params = params.split(',');

	for (var paramCount = 0; paramCount < params.length; paramCount++) {
		inObject.$in.push(params[paramCount]);
	}

	return inObject;
};

exports.gtObject = function(greaterThanValue){
	return { $gt: greaterThanValue };
};

exports.ltObject = function(lessThanValue){
	return { $lt: lessThanValue };
};

exports.containsObject = function(containsValue){
	return { $regex : '.*' + containsValue + '.*', $options: 'i' };
};
