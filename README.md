InstaAPI
=========

REST API that dynamically mounts all MongoDB Databases and Collections as queryable endpoints.


This Application will allow you to query any database or collection on your mongoDB server through REST API calls.

Input a query with the following syntax to recieve a response.

`localhost:port/Database/Collection?query=here&params=here`


EG

`api.SamHeslop/MyDatabase/MyCollection?name=myName`

Will complete a mongo query as followed.

    myCollection.find({name:'myName'},function(err,res){
      .....
    };

#Query Support
Currently supports the following URL query syntax:

In Statement(Array Notation) - 

`api.SamHeslop/MyDatabase/MyCollection?name=[Mac,Dennis,Charlie,Dee,Frank]`

Greater Than and Less Than Statements - 

`api.SamHeslop/MyDatabase/MyCollection?price gt 100`
`api.SamHeslop/MyDatabase/MyCollection?price lt 100`

Contains Query using Case Insensitive Regex - 
`api.SamHeslop/MyDatabase/MyCollection?name=contains(pa)`
