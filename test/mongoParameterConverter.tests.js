var should = require('should'),
	mongoConverter = require('../lib/mongoParameterConverter');

describe('inObject Should Turn a Query Parameter into In Query Object', function(){
	it('should', function(){

		var requestParams = {
			PropertyOne : '100',
			PropertyTwo : 'Hello',
			PropertyThree : '[ValueOne,ValueTwo]'
		};

		requestParams.PropertyThree = mongoConverter.inObject(requestParams.PropertyThree);
		
		requestParams.PropertyThree.$in[0].should.be.eql('ValueOne');
		requestParams.PropertyThree.$in[1].should.be.eql('ValueTwo');
	});
});

describe('gtObject Should return Greater Than Query Parameter into a Greater Than Query Object', function(){
	it('should', function(){
		var result = mongoConverter.gtObject('Value');
		result.should.be.eql({ '$gt' : 'Value' });
	});
});

describe('ltObject Should return Less Than Query Parameter into a Less Than Query Object', function(){
	it('should', function(){
		var result = mongoConverter.ltObject('Value');
		result.should.be.eql({ '$lt' : 'Value' });
	});
});

describe('containsObject Should return a Contains Parameter into a Regex Query Object', function(){
	it('should', function(){
		var result = mongoConverter.containsObject('mi');
		result.should.be.eql({ '$regex' : '.*mi.*', '$options': 'i' });
	});
});