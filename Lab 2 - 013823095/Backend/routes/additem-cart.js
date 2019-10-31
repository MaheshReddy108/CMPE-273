//submit booking.js - Submit booking route module
var express = require('express');
var router = express.Router();
//Passport authentication

var passport = require('passport');
// Set up middleware
var requireAuth = passport.authenticate('jwt', {session: false});
//Kafka
var kafka = require('../kafka/client');

router.post('/', requireAuth, function (req, res) {

    console.log('Inside Add Item to cart POST!');
    console.log('Request Body: ', req.body);

    if (req.session.user) {

        kafka.make_request("additem-cart", req, function(err, result){
            if(err){
                console.log("Unable to add Item to cart.", err);
                res.writeHead(400, {
                    'Content-type': 'text/plain'
                });
                res.end('Error in adding a booking');
            }
            else{
                console.log('Cart updated to Buyer details', result);
                res.writeHead(200, {
                        'Content-type': 'text/plain'
                });
                res.end('Item added to cart successfully! ');
            }
        });

    }

});

module.exports = router;