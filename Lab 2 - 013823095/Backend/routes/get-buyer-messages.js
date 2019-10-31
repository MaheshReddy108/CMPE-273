//submit booking.js - Submit booking route module
var express = require('express');
var router = express.Router();
//Passport authentication

var passport = require('passport');
// Set up middleware
var requireAuth = passport.authenticate('jwt', {session: false});
//Kafka
var kafka = require('../kafka/client');
//Get buyer messages

router.post('/', function(req, res){
    console.log('Inside Get buyer Message GET!');
    console.log('Request body: ', req.body);

    kafka.make_request("get-buyer-messages", req, function(err, result){
        if(err){
            console.log("Unable to get buyer message.", err);
                res.writeHead(400, {
                    'Content-type': 'text/plain'
                });
                res.end('Error in get buyer message');
        }
        else{
                console.log('buyer Message retreived successfully ', result);
                res.writeHead(200, {
                        'Content-type': 'text/plain'
                });
                res.end(JSON.stringify(result));
        }
    });
});


module.exports = router;