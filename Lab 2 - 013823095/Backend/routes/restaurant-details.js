//search.js - Search route module
var express = require('express');
var router = express.Router();
//Passport authentication

var passport = require('passport');
// Set up middleware
var requireAuth = passport.authenticate('jwt', {session: false});
//Kafka
var kafka = require('../kafka/client');

//Get restaurant Details

router.post('/', requireAuth, function (req, res) {

    console.log('Inside restaurant Details Method POST!');
    console.log('Request Body: ', req.body);

    if (req.session.user) {

        kafka.make_request("restaurant-details", req, function(err, result){
            if(err){
                console.log('Error in Retrieving restaurant Details', err);
                res.writeHead(400, {
                    'Content-type': 'text/plain'
                });
                res.end('Error in Retrieving restaurant Details');
            }
            else{
                console.log(JSON.stringify(result));
                res.writeHead(200, {
                    'Content-type': 'application/json'
                });
                res.end(JSON.stringify(result));
            }
        });        
    }

});


module.exports = router;