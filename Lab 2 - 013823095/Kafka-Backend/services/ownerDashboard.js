var Model = require('../DatabaseConnection');

function handle_request(message, callback){
    console.log('Inside Kafka Method owner dashboard. Message ', message);
    
    Model.Userdetails.findOne({
        Email: message.session.user.Email
    }, (err, user) => {
        if (err) {
            console.log("Unable to get user details.", err);
            callback(err, null);
        }
        else {
            console.log('Restaurant details of owner', JSON.stringify(user.RestaurantDetails));
            callback(null, user.RestaurantDetails);
        }
    });
}

exports.handle_request = handle_request;