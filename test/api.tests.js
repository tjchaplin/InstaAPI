var should = require('should'),
	api = require('../lib/api');

describe('checkQueryParams Should Detect Invalid Parameters', function(){
	it('should', function(){

		var requestParams = {
			PropertyOne : '100',
			PropertyTwo : 'Hello',
			PropertyThree : 'Invalid!',
			PropertyFour : 'Woo!',
			PropertyFive : 'Invalid!'
		};

		var doc = {
			PropertyOne : '100',
			PropertyTwo : 'Hello',
			PropertyFour : 'Woo!'
		};

		var invalidParams = [];
		invalidParams.push('PropertyThree');
		invalidParams.push('PropertyFive');

		var result = api.checkQueryParams(requestParams, doc);
		
		result.should.be.eql(invalidParams);
	});
});