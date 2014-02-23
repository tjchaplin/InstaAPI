var totalRequests;

exports.monitorAPI = function(app){
	var io = require('socket.io').listen(app.listen(3000),{ log: false });

	io.sockets.on('connection', function (socket) {
		setInterval(function(){
			var status = { 
				Uptime: formatUptime(),
				RequestsPerMinute: requestsPerMinute() 
			};
			console.log(requestsPerMinute());
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
		var minutes = ~~((time % 3600) / 60);
		var requestsPerMinute = minutes === 0 ? 0 : totalRequests / minutes;
		return requestsPerMinute;
	}
};

exports.incrementTotalRequests = function(){	
	totalRequests === undefined ? totalRequests = 1 : totalRequests++;
};