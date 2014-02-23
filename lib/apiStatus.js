exports.monitorAPI = function(app){
	var io = require('socket.io').listen(app.listen(3000),{ log: false });

	io.sockets.on('connection', function (socket) {
		setInterval(function(){
			var status = { Uptime: formatUptime() };
			socket.emit('broadcastStatus', status); 
		}, 1000);

		sockets.emit('nodeDetails', generateNodeDetails());
	});	

	function formatUptime(socket){
		var time = process.uptime().toFixed(2);
		
		var days = ~~(time / 86400);
		var hours = ~~(time / 3600);
		var minutes = ~~((time % 3600) / 60);
		var seconds = (time % 60).toFixed(0);

		return days + 'd ' + hours +'h ' + minutes +'m ' + seconds + 's ';
	}
};