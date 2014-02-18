exports.exposeEndPoints = function(app){
	app.get('/EndPoint/', function(req, res){ 
		queryBuilder(req.params);
		res.send(req.params);
	});
};

queryBuilder = function(params){
	for (var i = 0; i < params.length; i++) {
		console.log(i);
	}
};