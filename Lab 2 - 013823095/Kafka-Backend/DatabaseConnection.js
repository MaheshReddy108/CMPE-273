const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/HomeAway');
mongoose.connect('mongodb+srv://mahesh:Mahesh1896@273-nu1yk.mongodb.net/test?retryWrites=true&w=majority');

var Userdetails = mongoose.model('Userdetails', {

    'Email' : {
        type: String
    },
    'Password' : {
        type: String
    },
    'FirstName' : {
        type: String
    },
    'LastName' : {
        type : String
    },
    'ProfileImage' : {
        type : String
    },
   
    'Address' : {
        type : String
    },
    'Accounttype' : {
        type : Number
    },
    'RestaurantDetails' : {
        type: Array
    },
    'Orderdetails' : Array,
    'ProfileId' : String
});


var RestaurantDetails = mongoose.model('RestaurantDetails', {    
    'RestaurantId' : String,
    'Cuisine' : String,
    'Description' : String,
    'Address' :String,
    'City' : String,
    'State' : String,
    'ZipCode' : String,
    'PropertyType' :String,
    'Bedrooms' : Number,
    'Accomodates' :Number,
    'Bathrooms': Number,
    'Photos' : String,
    'Currency' : String,
    'Baserate' : String,
    'AvailabilityStartDate': Date,
    'AvailabilityEndDate': Date,
    'MinStay' : Number,
    'Ownername' : String,
    'Messages': Array,
    'OwnerId' : String
});

var OrderDetails = mongoose.model('OrderDetails', {
    'RestaurantId' : String,
    'Bookingstartdate' : Date,
    'Bookingenddate' : Date,
    'Guests': Number,
    'TotalCost' : String,
    'Ownername' : String,
    'Travelername' : String,
    'BuyerId' : Number
});

var MessageCollection = mongoose.model('MessageCollection',{
    'RestaurantId' : String,
    'BuyerId' : String,
    'OwnerId' : String,
    'Message' : JSON,
    'MessageId': String
});

module.exports = {
    Userdetails,
    RestaurantDetails,
    OrderDetails,
    MessageCollection
};
