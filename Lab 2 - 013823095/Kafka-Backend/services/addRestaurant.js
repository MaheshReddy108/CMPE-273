var Model = require('../DatabaseConnection');
var mongooseTypes = require('mongoose').Types;

function handle_request(message, callback){
    console.log('Inside Kafka Method Add Restaurant. Message ', message);

    const RestaurantId = mongooseTypes.ObjectId();
    const newRestaurant = message.body;
    const userSession = message.session.user;


        Model.Userdetails.findOne({
            Email: userSession.Email
        }, function (err, user) {
            if (err) {
                console.log("Add-Restaurant. Unable to fetch user details.", err);
                res.writeHead(400, {
                    'Content-type': 'text/plain'
                });
                res.end('Add-Restaurant. Error in fetching user details!');
            }
            else {
                console.log('User', user);
                var RestaurantDetails = {
                    //RestaurantId: RestaurantId.toString(),
                    Country: newRestaurant.LocationDetails.country,
                    StreetAddress: newRestaurant.LocationDetails.streetAddress,
                    UnitNumber: newRestaurant.LocationDetails.unitNumber,
                    City: newRestaurant.LocationDetails.city,
                    State: newRestaurant.LocationDetails.state,
                    ZipCode: newRestaurant.LocationDetails.zipCode,
                    Headline: newRestaurant.Details.headline,
                    Description: newRestaurant.Details.description,
                    RestaurantType: newRestaurant.Details.RestaurantType,
                    Photos: newRestaurant.Photos.photos,
                    
                };
                user.RestaurantDetails = user.RestaurantDetails || [];
                user.RestaurantDetails.push(RestaurantDetails);

                /**Save Restaurant to user details */
                user.save().then((doc) => {

                    console.log("Restaurant details saved successfully.", doc);


                }, (err) => {
                    console.log("Unable to Restaurant details.", err);
                    callback(err, null);
                });

                /**Save Restaurant to user details */


            }
        });

        /**Creating Restaurant object to add to Restaurant details collection */
        var Restaurant = new Model.RestaurantDetails({
            RestaurantId: RestaurantId,
            Country: newRestaurant.LocationDetails.country,
            StreetAddress: newRestaurant.LocationDetails.streetAddress,
            UnitNumber: newRestaurant.LocationDetails.unitNumber,
            City: newRestaurant.LocationDetails.city,
            State: newRestaurant.LocationDetails.state,
            ZipCode: newRestaurant.LocationDetails.zipCode,
            Headline: newRestaurant.Details.headline,
            Description: newRestaurant.Details.description,
            RestaurantType: newRestaurant.Details.RestaurantType,
            Photos: newRestaurant.Photos.photos,
           
            Ownername: userSession.FirstName + " " + userSession.LastName,
            OwnerId: userSession.ProfileId
        });

      


        Restaurant.save().then((doc) => {

            console.log("Restaurant details saved successfully.", doc);
            callback(null, doc);

        }, (err) => {
            console.log("Unable to Restaurant details.", err);
            callback(err, null);
        });

        /**Creating Restaurant object to add to Restaurant details collection */

}

exports.handle_request = handle_request;