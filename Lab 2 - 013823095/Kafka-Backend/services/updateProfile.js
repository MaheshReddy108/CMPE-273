var Model = require('../DatabaseConnection');

function handle_request(message, callback){
    console.log('Inside Kafka Method update-profile. Message ', message);

    Model.Userdetails.findOne({
        'Email': message.session.user.Email
    }, (err, user) => {

        if (err) {
            console.log("Unable to fetch user details.", err);
            callback(err, null);
        }
        else {
            console.log('Userdetails', user);

            user.FirstName = message.body.FirstName;
            user.LastName = message.body.LastName;
            user.Email = message.body.Email;
            user.Aboutme = message.body.Aboutme;
            user.Address = message.body.Address;
            user.PhoneNumber = message.body.PhoneNumber;
            user.ProfileImage = message.body.ProfileImage;

            user.save().then((doc) => {

                console.log("User details saved successfully.", doc);
                callback(null, doc);

            }, (err) => {
                console.log("Unable to save user details.", err);
                callback(err, null);
            });
        }
    });
}

exports.handle_request = handle_request;