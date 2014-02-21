var should = require('should'),
	mongo = require('../lib/mongoAdapter').MongoAdapter;

describe('parameters() Should Populate New Object with Params from Request URL', function(){
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

		var result = mongo.getParameters(testRequest);

		var successfulResult = {
			DatabaseName : 'MyDatabase',
			CollectionName : 'MyCollection' 
		};

		result.DatabaseName.should.be.eql('MyDatabase');
		result.CollectionName.should.be.eql('MyCollection');
	});
});