var Model = require('../DatabaseConnection');

async function handle_request(message, callback){
    
    console.log('Inside Kafka Method Submit  Booking. Message ', message);
    const userSession = message.session.user;

    var booking = new Model.BookingDetails({
        'RestaurantId': message.body.RestaurantId,
        'TotalCost': message.body.TotalCost,
        'Ownername': message.body.Ownername,
        'Buyername': userSession.FirstName + " " + userSession.LastName,
        'BuyerId': userSession.ProfileId,
    });

    await booking.save().then((doc) => {
        console.log("item details saved successfully.", doc);        
    },
        (err) => {
            console.log("Unable to save item details.", err);
            callback(err, null);
        });

    Model.Userdetails.findOne({
        Email: message.session.user.Email
    }, function (err, user) {
        if (err) {
            console.log("Unable to get user details.", err);
            callback(err, null);
        }
        else {

            var RestaurantDetails = message.body.RestaurantDetails;
            RestaurantDetails.RestaurantId = message.body.RestaurantId;
            RestaurantDetails.TotalCost = message.body.TotalCost;
            RestaurantDetails.Ownername = message.body.Ownername;
            RestaurantDetails.Buyername = userSession.FirstName + " " + userSession.LastName;
            RestaurantDetails.BuyerId = userSession.ProfileId;

            user.Orderdetails = user.Orderdetails || [];
            user.Orderdetails.push(RestaurantDetails);
            user.save().then((doc) => {
                console.log('Booking details saved to user details', doc);
                callback(null, doc);
            }, (err) => {
                console.log("Unable to save booking details.", err);
                callback(err, null);
            });

        }
    });
}

exports.handle_request = handle_request;
