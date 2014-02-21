var should = require('should'),
	oData = require('../lib/openData').OpenData;

describe('createInParam Should Turn In Query Parameters into In Query Object', function(){
	it('should', function(){

		var requestParams = {
			PropertyOne : '100',
			PropertyTwo : 'Hello',
			PropertyThree : '[ValueOne,ValueTwo]'
		};

		requestParams.PropertyThree = oData.inObject(requestParams.PropertyThree);
		
		requestParams.PropertyThree.$in[0].should.be.eql('ValueOne');
		requestParams.PropertyThree.$in[1].should.be.eql('ValueTwo');
	});
});