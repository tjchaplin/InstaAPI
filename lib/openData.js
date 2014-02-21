var OpenData = {};

OpenData.inObject = function(inParams){
	var inObject = { $in: [] };
	var params = inParams.replace('[','').replace(']','');
	params = params.split(',');

	for (var paramCount = 0; paramCount < params.length; paramCount++) {
		inObject.$in.push(params[paramCount]);
	};

	return inObject;
};

exports.OpenData = OpenData;