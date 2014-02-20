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

describe('locateMongoParameters Should Populate New Object with Params from Request URL', function(){
	it('should', function(){

		var testRequest = {
			HeaderStuff : 'HeaderStuff',
			OtherRequestStuff : 'blah blah blah',
			MoreRandomStuff : {
				Sam : 'Sam',
				SAMSAM : 'SAMSAM'
			},
			params : {
				databaseName : 'MyDatabase',
				collectionName : 'MyCollection'
			}
		};

		var result = api.locateMongoParameters(testRequest);

		var successfulResult = {
			DatabaseName : 'MyDatabase',
			CollectionName : 'MyCollection' 
		};

		result.DatabaseName.should.be.eql('MyDatabase');
		result.CollectionName.should.be.eql('MyCollection');
	});
});