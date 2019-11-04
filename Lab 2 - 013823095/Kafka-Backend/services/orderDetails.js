var Model = require('../DatabaseConnection');

function handle_request(message, callback){
    console.log('Inside Kafka Method Order-details. Message ', message);
    
    Model.Userdetails.findOne({
        Email: message.session.user.Email        
    }, (err, user) => {
        if (err) {
            console.log("Unable to get user details.", err);
            callback(err, null);
        }
        else {
            console.log('Order details', JSON.stringify(user.Orderdetails));
            callback(null, user.Orderdetails);
        }
    });
}

exports.handle_request = handle_request;