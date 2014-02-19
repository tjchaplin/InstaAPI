Restplate
=========

REST API that dynamically mounts all MongoDB Databases and Collections as queryable endpoints.


This Application will allow you to query any database or collection on your mongoDB server through REST API calls.

Input a query with the following syntax to recieve a response.

`localhost:port/Database/Collection?query=here&params=here`


EG

`api.SamHeslop/MyDatabase/MyCollection?name=myName`

Will complete a mongo query as followed.

    myCollection.find({name:'myName'},function(err,res){
      res.send(results);
    };
