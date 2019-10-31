//Add-Restaurant.js - Add Restaurant details route module
var express = require('express');
var router = express.Router();
//Passport authentication

var passport = require('passport');
// Set up middleware
var requireAuth = passport.authenticate('jwt', {session: false});
//Kafka
var kafka = require('../kafka/client');

//Post-Restaurant
router.post('/', requireAuth, function (req, res) {

    console.log('Inside Add Restaurant POST!');
    console.log('Request Body: ', req.body);
    const newRestaurant = req.body;
    const userSession = req.session.user;

    if (req.session.user) {

        kafka.make_request("add-restaurant", req, function(err, result){
            if(err){
                console.log("Error in adding restaurant.", err);
                res.writeHead(400, {
                    'Content-type': 'text/plain'
                });
                res.end('Error in adding restaurant.');
            }
            else{                
                console.log("restaurant details saved successfully.", result);
                res.writeHead(200, {
                    'Content-type': 'text/plain'
                });
                res.end('Adding a restaurant successful!');
            }
        });
    }
});

module.exports = router;