var totalRequests, successfulRequests, unsuccessfulRequests;
var requestTargets;

exports.monitorAPI = function(app){
	var io = require('socket.io').listen(app.listen(3000),{ log: false });

	io.sockets.on('connection', function (socket) {
		setInterval(function(){
			var status = {
				Uptime: formatUptime(),
				RequestsPerMinute: requestsPerMinute(),
				TotalRequests: totalRequests ? totalRequests : 0,
				SuccessfulRequests: successfulRequests ? successfulRequests : 0,
				UnsuccessfulRequests: unsuccessfulRequests ? unsuccessfulRequests : 0,
				RequestTargets: requestTargets
			};
			socket.emit('broadcastStatus', status);
		}, 1000);
	});	

	function formatUptime(){
		var time = process.uptime().toFixed(2);
		
		var days = ~~(time / 86400);
		var hours = ~~(time / 3600);
		var minutes = ~~((time % 3600) / 60);
		var seconds = (time % 60).toFixed(0);

		return days + 'd ' + hours +'h ' + minutes +'m ' + seconds + 's ';
	}

	function requestsPerMinute(){
		var time = process.uptime().toFixed(2);
		var minutes = ~~(time / 60);
		var requestsPerMin = minutes === 0 ? 0 : ~~(totalRequests / minutes);
		return requestsPerMin;
	}
};

exports.updateRequestTargets = function(databaseName, collectionName){
	if (requestTargets === undefined ){
		requestTargets = { Databases: [] };
		updateDatabaseRecord(databaseName, collectionName)
	}	
	else {
		updateDatabaseRecord(databaseName, collectionName)
	}
};

function updateDatabaseRecord(databaseName, collectionName)
{
	for (var dbCount = 0; dbCount < requestTargets.Databases.length; dbCount++) {
		var databaseExists = false;

		if (requestTargets.Databases[dbCount].Name === databaseName){
			databaseExists = true;
			updateCollectionRecord(dbCount, collectionName);
		}
	};
	if (!databaseExists){
		requestTargets.Databases.push(createDatabaseRecord(databaseName, collectionName));
	}
}

function createDatabaseRecord(databaseName, collectionName){
	return  { Name: databaseName, Collections: [{ Name: collectionName, HitCount: 1 } ], TotalHits: 1 };
}

function updateCollectionRecord(dbCount, collectionName){
	for (var collectionCount = 0; collectionCount < requestTargets.Databases[dbCount].Collections.length; collectionCount++) {
		var collectionExists = false;

		if (requestTargets.Databases[dbCount].Collections[collectionCount].Name === collectionName){
			collectionExists = true;
			requestTargets.Databases[dbCount].Collections[collectionCount].HitCount++;
		}
	};
	if (!collectionExists){
		requestTargets.Databases[dbCount].Collections.push(createCollectionRecord(collectionName));
		requestTargets.Databases[dbCount].TotalHits++;
	}
}

function createCollectionRecord(collectionName){
	return  { Name: collectionName, HitCount: 1 };
}

exports.incrementTotalRequests = function(){	
	totalRequests === undefined ? totalRequests = 1 : totalRequests ++;
};

exports.incrementSuccessfulRequests = function(){	
	successfulRequests === undefined ? successfulRequests = 1 : successfulRequests ++;
};

exports.incrementUnsuccessfulRequests = function(){	
	unsuccessfulRequests === undefined ? unsuccessfulRequests = 1 : unsuccessfulRequests ++;
};