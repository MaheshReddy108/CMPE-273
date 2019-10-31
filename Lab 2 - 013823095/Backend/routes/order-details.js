//submit booking.js - Submit booking route module
var express = require('express');
var router = express.Router();
//Passport authentication

var passport = require('passport');
// Set up middleware
var requireAuth = passport.authenticate('jwt', {session: false});
//Kafka
var kafka = require('../kafka/client');

//Trip - details
router.get('/', requireAuth, function (req, res) {

    console.log('Inside Order Details GET!');
    const userSession = req.session.user;

    if (req.session.user) {

        kafka.make_request("order-details", req, function(err, result){
            if(err){
                console.log("Error in Order details.", err);
                res.writeHead(400, {
                    'Content-type': 'text/plain'
                });
                res.end('Error in trip details');
            }
            else{
                console.log('Order details', JSON.stringify(result));
                res.writeHead(200, {
                    'Content-type': 'application/json'
                });
                res.end(JSON.stringify(result));
            }
        });               
    }


});


module.exports = router;