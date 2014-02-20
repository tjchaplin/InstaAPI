var OpenData = {};

OpenData.inObject = function(inParams){
	var inObject = { $in: [] };

	for (var paramCount = 0; paramCount < inParams.length; paramCount++) {
		inObject.$in.push(inParams[paramCount]);
	};

	return inObject;
};

exports.OpenData = OpenData;