var should = require('should'),
	oData = require('../lib/openData').OpenData;

describe('createInParam Should Turn In Query Parameters into In Query Object', function(){
	it('should', function(){

		var requestParams = {
			PropertyOne : '100',
			PropertyTwo : 'Hello',
			PropertyThree : ['ValueOne', 'ValueTwo']
		};

		var result = oData.inObject(requestParams.PropertyThree);
		
		result.should.be.eql({ $in: ['ValueOne', 'ValueTwo'] });
	});
});