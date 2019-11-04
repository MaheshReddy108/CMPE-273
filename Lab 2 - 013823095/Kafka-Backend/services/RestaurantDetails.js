var Model = require('../DatabaseConnection');

function handle_request(message, callback){
    console.log('Inside Kafka Method Restaurant Details. Message ', message);

    Model.RestaurantDetails.find({
        RestaurantId: message.body.RestaurantId
    }, (err, result) => {
        if (err) {
            console.log('Error in Retrieving Restaurant data', err);
            callback(err, null);
        }
        else {
            console.log('Restaurant Data ', JSON.stringify(result));
            callback(null, result);
        }        
    });
}

exports.handle_request = handle_request;