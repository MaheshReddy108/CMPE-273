var express = require('express');  
var app = express();  
var MongoClient = require('mongodb').MongoClient;  
var assert = require('assert');

// Connection URL
var url = 'mongodb+srv://mahesh:Mahesh1896@273-nu1yk.mongodb.net/test?retryWrites=true&w=majority';

// start server on port 3000
app.listen(3000, '0.0.0.0', function() {  
  // print a message when the server starts listening
  console.log("server starting");
});

// Use connect method to connect to the server when the page is requested
app.get('/', function(request, response) {  
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    db.listCollections({}).toArray(function(err, collections) {
        assert.equal(null, err);
        collections.forEach(function(collection) {
            console.log(collection);
        });
        db.close();
    })
    response.send('Connected - see console for a list of available collections');
  });
});
