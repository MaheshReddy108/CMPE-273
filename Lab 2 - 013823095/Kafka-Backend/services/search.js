var Model = require('../DatabaseConnection');

function handle_request(message, callback){
    console.log('Inside Kafka Method Search Restaurant. Message ', message);

    const searchrestaurants = message.body;

    //Restaurant search based on availability
    var restaurants = [];
    Model.RestaurantDetails.find({
        City: searchrestaurants.searchText,
        AvailabilityStartDate: {

            $lte: new Date(searchrestaurants.startDate)
        },
        AvailabilityEndDate: {
            $gte: new Date(searchrestaurants.endDate),

        }
    }, async (err, result) => {
        if (err) {
            console.log('Error in Retrieving Restaurant data', err);
            callback(err, null);
        }
        else {
            console.log('Restaurant list seacrh based on availability dates', JSON.stringify(result));

            restaurants = result;
            var RestaurantResult = [];
            for (let i = 0; i < restaurants.length; i++) {
                console.log('Insiderestaurants array: ', restaurants[i].RestaurantId);


                await Model.OrderDetails.find({
                    RestaurantId: restaurants[i].RestaurantId
                }, (err, result) => {
                    if (err) {
                        console.log('Error in Retrieving Restaurant data', err);
                        callback(err, null);
                    }
                    else {

                        if (result.length > 0) {

                   
                            console.log(Orderstartdate + " " + Orderenddate);
                            console.log(new Date(searchrestaurants.startDate) + " " + new Date(searchrestaurants.endDate));
                            console.log('Check startDate: ', new Date(searchrestaurants.startDate) >= Orderstartdate && new Date(searchrestaurants.startDate) <= Orderenddate);
                            console.log('Check endDate: ', new Date(searchrestaurants.endDate) >= Orderstartdate && new Date(searchrestaurants.endDate) <= Orderenddate);
                            if ((new Date(searchrestaurants.startDate) >= Orderstartdate && new Date(searchrestaurants.startDate) <= Orderenddate) || (new Date(searchrestaurants.endDate) >= Orderstartdate && new Date(searchrestaurants.endDate) <= Orderenddate)) {
                                restaurants.splice(i, 1);
                            }
                        }
                    }
                });
            }
            
            console.log(JSON.stringify(restaurants));
            callback(null, restaurants);
        }
    });
}

exports.handle_request = handle_request;