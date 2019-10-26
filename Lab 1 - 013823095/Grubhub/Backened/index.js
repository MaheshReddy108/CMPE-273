
var express = require('express');
const multer = require('multer');
const uuidv4 = require('uuid/v4');
const path = require('path');
const fs = require('fs');
var pool = require('./ConnectionPooling.js');


var app = express();

var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');

var mysql = require('mysql');
var bcrypt = require('bcrypt');


//set up cors
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//set up session variable

app.use(session({
    secret: 'cmpe273-grubhub-app',
    resave: false,
    saveUninitialized: false,
    duration: 60 * 60 * 100,
    activeDuration: 5 * 60 * 100
}));

app.use(bodyParser.json());

//Allow acceess control headers
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

//Storing documents/Images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    }
    , filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

//Login validation
app.post('/login', function (req, res) {

    console.log('Inside login POST');
    console.log('1.Request Body: ', req.body);

    //Query

    pool.getConnection(function (err, conn) {
        if (err) {
            console.log('Error in creating connection!');
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error in creating connection!');
        }
        else {

            //Login validation query
            var sql = 'SELECT Fname,Lname,Email,Password from BUYER WHERE Email = ' + mysql.escape(req.body.email) +  'UNION SELECT Fname,Lname,Email,Password from OWNER WHERE Email = '+ mysql.escape(req.body.email);
            conn.query(sql, function (err, result) {

                if (err) {
                    res.writeHead(400, {
                        'Content-Type': 'text/plain'
                    });
                    console.log('sql error');
                    
                    res.end('sql error');
                }
                else {



                    if (result.length == 0 || !bcrypt.compareSync(req.body.password , result[0].Password)) {
                        res.writeHead(401, {
                            'Content-type': 'text/plain'
                        })
                        console.log('Invalid Credentials!');
                        res.end('Invalid Credentials!');
                    }
                    else {
                        console.log(result);
                        res.cookie('cookie', result[0].Fname, {
                            maxAge: 360000,
                            httpOnly: false,
                            path: '/'
                        });
                        console.log("2.result[0]: ", result[0]);
                        req.session.user = result[0];
                        console.log("3.req.session.user: ",req.session.user);
                        res.writeHead(200, {
                            'Content-type': 'text/plain'
                        })
                        console.log('Login successful!');
                        res.end('4.Login successful!');
                    }

                }
            });
        }
    });
});


//Buyer-Signup
app.post('/Buyer-signup', function (req, res) {

    console.log('Inside Signup POST');
    console.log('Request Body: ', req.body);

    //User creation query

    var presql = 'SELECT Buyer_id from BUYER where Email = ' + mysql.escape(req.body.Email);

    pool.getConnection(function (err, conn) {

        if (err) {
            console.log('Error in creating connection!');
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error in creating connection!');
        }
        else {

            conn.query(presql, function (err, result) {
                if (err) {
                    res.writeHead(400, {
                        'Content-type': 'text/plain'
                    });
                    console.log('Error in adding an user');
                    res.end('Error in adding an user presql');
                }
                else {
                    if (result[0]) {
                        res.writeHead(400, {
                            'Content-type': 'text/plain'
                        });
                        console.log('User already exists');
                        res.end('User already exists');
                    }
                    else {

                        //Hashing Password!
                        // const hashedPassword = bcrypt.hash(req.body.Password);
                        console.log("it is here");
                        const saltRounds = 10;
                        
                        bcrypt.hash(req.body.Password, saltRounds).then(function(hash) {
                            const hashedPassword = hash;
                            console.log(hashedPassword);
                            
                            var sql = 'INSERT into BUYER (Fname, Lname, Email,Password) VALUES(' +
                            mysql.escape(req.body.FirstName) + ',' +
                            mysql.escape(req.body.LastName) + ',' +
                            mysql.escape(req.body.Email) + ',' +
                             mysql.escape(hashedPassword )+ ');';

                            conn.query(sql, function (err, result) {
                                if (err) {
                                    console.log('Error in adding an user why');
                                    res.writeHead(400, {
                                        'Content-type': 'text/plain'
                                    });
                                    res.end('Error in adding an user why');
                                }
                                else {
                                    console.log('Adding a user successful!');
                                    res.writeHead(200, {
                                        'Content-type': 'text/plain'
                                    });
                                    res.end('Adding a user successful!');
                                }
                            });
                        });

                        
                    }


                    
                }
            });

        }
    });
});


//Owner-Signup
app.post('/Owner-signup', function (req, res) {

    console.log('Inside Signup POST');
    console.log('Request Body: ', req.body);

    //User creation query

    var presql = 'SELECT Owner_id from Owner where Email = ' + mysql.escape(req.body.Email);

    pool.getConnection(function (err, conn) {

        if (err) {
            console.log('Error in creating connection!');
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error in creating connection!');
        }
        else {

            conn.query(presql, function (err, result) {
                if (err) {
                    res.writeHead(400, {
                        'Content-type': 'text/plain'
                    });
                    console.log('Error in adding an user');
                    res.end('Error in adding an user presql');
                }
                else {
                    if (result[0]) {
                        res.writeHead(400, {
                            'Content-type': 'text/plain'
                        });
                        console.log('User already exists');
                        res.end('owner already exists');
                    }
                    else {

                        //Hashing Password!
                        // const hashedPassword = bcrypt.hash(req.body.Password);
                        console.log("it is here");
                        const saltRounds = 10;
                        
                        bcrypt.hash(req.body.Password, saltRounds).then(function(hash) {
                            const hashedPassword = hash;
                            console.log(hashedPassword);
                            
                            var sql = 'INSERT into OWNER (Fname, Lname,Res_name,Email,Res_address,Res_zip,Phone,Cuisine,Locations,Password) VALUES(' +
                            mysql.escape(req.body.FirstName) + ',' +
                            mysql.escape(req.body.LastName) + ',' +
                            mysql.escape(req.body.RestaurantName) + ',' +
                            mysql.escape(req.body.Email) + ',' +
                            mysql.escape(req.body.RestaurantAddress) + ',' +
                            mysql.escape(req.body.RestaurantZipcode) + ',' +
                            mysql.escape(req.body.RestaurantPhoneNumber) + ',' +
                            mysql.escape(req.body.Cuisine) + ',' +
                            mysql.escape(req.body.Locations) + ',' +
                             mysql.escape(hashedPassword )+ ');';

                            conn.query(sql, function (err, result) {
                                if (err) {
                                    console.log('Error in adding an user why');
                                    res.writeHead(400, {
                                        'Content-type': 'text/plain'
                                    });
                                    res.end('Error in adding an user why');
                                }
                                else {
                                    console.log('Adding a owner successful!');
                                    res.writeHead(200, {
                                        'Content-type': 'text/plain'
                                    });
                                    res.end('Adding a owner successful!');
                                }
                            });
                        });

                        
                    }


                    
                }
            });

        }
    });
});





//Buyer Profile Details
app.get('/Buyer-profile-details', function (req, res) {

    console.log('5.Inside Buyer Profile Details GET!');
    console.log('6.Request Body:', req.body);

 console.log(`7. last ${req.session.user}`);
 
    if (req.session.user) {

        pool.getConnection(function (err, conn) {
            if (err) {
                console.log('Error in creating connection!');
                res.writeHead(400, {
                    'Content-type': 'text/plain'
                });
                res.end('Error in creating connection!');

            }
            else {

                //Profile Details query
                var sql = 'SELECT * from BUYER where Buyer_Id = ' + mysql.escape(req.session.user.Buyer_id);
                console.log("Buyer_Id : ", req.session.user.Buyer_id);
                conn.query(sql, function (err, result) {
                    if (err) {
                        console.log('Error in retrieving Buyer profile data');
                        res.writeHead(400, {
                            'Content-type': 'text/plain'
                        });
                        res.end('Error in retrieving Buyer profile data');
                    }
                    else {
                        console.log('Profile Data: ', result);
                        res.writeHead(200, {
                            'Content-type': 'application/json'
                        });
                        res.end(JSON.stringify(result[0]));
                    }
                });
            }
        });
    }

});


//Owner Profile Details
app.get('/Owner-profile-details', function (req, res) {

    console.log('Inside   Onwer Profile Details GET!');
    console.log('Request Body:', req.body);

    if (req.session.user) {

        pool.getConnection(function (err, conn) {
            if (err) {
                console.log('Error in creating connection!');
                res.writeHead(400, {
                    'Content-type': 'text/plain'
                });
                res.end('Error in creating connection!');

            }
            else {

                //Profile Details query
                var sql = 'SELECT * from OWNER where OWNER_Id = ' + mysql.escape(req.session.user.Owner_id);
                console.log("owner_Id : ", req.session.user.Owner_id);
                conn.query(sql, function (err, result) {
                    if (err) {
                        console.log('Error in retrieving Owner profile data');
                        res.writeHead(400, {
                            'Content-type': 'text/plain'
                        });
                        res.end('Error in retrieving Onwer profile data');
                    }
                    else {
                        console.log('Profile Data: ', result);
                        res.writeHead(200, {
                            'Content-type': 'application/json'
                        });
                        res.end(JSON.stringify(result[0]));
                    }
                });
            }
        });
    }

});


//Buyer Update Profile data

app.post('/Buyer-update-profile', function (req, res) {

    console.log('Inside Buyer Update Profile POST!');
    console.log('Request Body: ', req.body);

    if (req.session.user) {

        pool.getConnection(function (err, conn) {

            if (err) {

                console.log('Error in creating connection!');
                res.writeHead(400, {
                    'Content-type': 'text/plain'
                });
                res.end('Error in creating connection!');

            }
            else {
                   console.log("this is id: ",req.session.user.Buyer_id);
                   
                var sql = 'UPDATE BUYER set ' +
                    'Fname = ' + mysql.escape(req.body.FirstName) + ',' +
                    'Lname = ' + mysql.escape(req.body.LastName) + ',' +
                    'Email = ' + mysql.escape(req.body.UserEmail) + ',' +
                    'Phone = ' + mysql.escape(req.body.UserPhone) + ',' +
                    'Address = ' + mysql.escape(req.body.UserAdr) + 
                
                    ' WHERE Buyer_id = ' + req.session.user.Buyer_id;

                conn.query(sql, function (err, result) {
                    if (err) {
                        console.log('Error in updating Buyer profile data');
                        res.writeHead(400, {
                            'Content-type': 'text/plain'
                        });
                        res.end('Error in updating Buyer profile data');

                    }
                    else {
                        console.log('Buyer Profile data update complete!');
                        res.writeHead(200, {
                            'Content-type': 'text/plain'
                        });
                        res.end('Buyer Profile data update complete!');
                    }
                });

            }
        });
    }

});

//Update  OWNER Profile data

app.post('/Owner-update-profile', function (req, res) {

    console.log('Inside  Owner Update Profile POST!');
    console.log('Request Body: ', req.body);

    if (req.session.user) {

        pool.getConnection(function (err, conn) {

            if (err) {

                console.log('Error in creating connection!');
                res.writeHead(400, {
                    'Content-type': 'text/plain'
                });
                res.end('Error in creating connection!');

            }
            else {

                var sql = 'UPDATE ONWER set ' +
                    'Fname = ' + mysql.escape(req.body.Firstname) + ',' +
                    'Lname = ' + mysql.escape(req.body.Lastname) + ',' +
                    'Email = ' + mysql.escape(req.body.Email) + ',' +
                    'Phone = ' + mysql.escape(req.body.userPhone) + ',' +
                    'Res_name= ' + mysql.escape(req.body.RestaurantName) + ',' +
                    'Res_address = ' + mysql.escape(req.body.RestaurantAddress) + ',' +
                    'Res_zip = ' + mysql.escape(req.body.RestaurantZip) + ',' +
                    'ProfileImage = ' + mysql.escape(req.body.ProfileImage) +
                    ' WHERE Owner_Id = ' + req.session.user.Owner_Id;

                conn.query(sql, function (err, result) {
                    if (err) {
                        console.log('Error in updating Owner profile data');
                        res.writeHead(400, {
                            'Content-type': 'text/plain'
                        });
                        res.end('Error in updating  Owner profile data');

                    }
                    else {
                        console.log('Owner Profile data update complete!');
                        res.writeHead(200, {
                            'Content-type': 'text/plain'
                        });
                        res.end('Owner Profile data update complete!');
                    }
                });

            }
        });
    }

});


//uplaod-file 

app.post('/upload-file', upload.array('photos', 5), (req, res) => {
    console.log('req.body', req.body);
    res.end();
});

//download-file

app.post('/download-file/:file(*)', (req, res) => {
    console.log('Inside DOwnload File');
    var file = req.params.file;
    var filelocation = path.join(__dirname + '/uploads', file);
    var img = fs.readFileSync(filelocation);
    var base64img = new Buffer(img).toString('base64');
    res.writeHead(200, {
        'Content--type': 'image/jpg'
    });
    res.end(base64img);
});




//Logout

app.post('/logout', function (req, res) {
    console.log('POST LOgout!');
    res.clearCookie('cookie');
    req.session.user = undefined;
    res.writeHead(200, {
        'Content-type': 'text/plain'
    });
    res.end('Back to login!');

});

//Search
app.post('/search', function (req, res) {

    console.log('Inside Search Method GET!');
    console.log('Request Body: ', req.body);

    const searchProperties = req.body;

    if (req.session.user) {

        pool.getConnection(function (err, conn) {
            if (err) {
                console.log('Error in creating connection!');
                res.writeHead(400, {
                    'Content-type': 'text/plain'
                });
                res.end('Error in creating connection!');
            }
            else {

                //Search Properties Query            
                var sql = 'SELECT * from OWNER Join ITEMS ON OWNER.Owner_id=ITEMS.Owner_id and OWNER.Res_name=ITEMS.Res_name  WHERE ' +
                    ' ITEMS.Item_name like % ' + mysql.escape(searchProperties.searchText) +'%' +
                    ' AND OWNER.Cuisine like %' + mysql.escape(searchProperties.cuisine)+'%';

                conn.query(sql, function (err, result) {

                    if (err) {
                        console.log('Error in Retrieving property data');
                        res.writeHead(400, {
                            'Content-type': 'text/plain'
                        });
                        res.end('Error in Retrieving property data');

                    }
                    else {
                        console.log(JSON.stringify(result));
                        res.writeHead(200, {
                            'Content-type': 'application/json'
                        });
                        res.end(JSON.stringify(result));
                    }
                });
            }
        });
    }
});


//Get Property Details

app.post('/Restauant-details', function (req, res) {

    console.log('Inside Restaurant Details Method POST!');
    console.log('Request Body: ', req.body);

    if (req.session.user) {

        pool.getConnection(function (err, conn) {
            if (err) {

                console.log('Error in creating connection!');
                res.writeHead(400, {
                    'Content-type': 'text/plain'
                });
                res.end('Error in creating connection!');

            }
            else {

                var sql = 'SELECT * from OWNER Join ITEMS ON OWNER.Owner_id=ITEMS.Owner_id and OWNER.Res_name=ITEMS.Res_name WHERE Res_name = ' + req.body.Res_name;
                conn.query(sql, function (err, result) {
                    if (err) {
                        console.log('Error in Retrieving restaurant');
                        res.writeHead(400, {
                            'Content-type': 'text/plain'
                        });
                        res.end('Error in Retrieving Restaurant');

                    }
                    else {
                        res.writeHead(200, {
                            'Content-type': 'application/json'
                        });
                        console.log(JSON.stringify(result[0]));
                        res.end(JSON.stringify(result[0]));
                        conn.release();
                    }
                });
            }

        });
    }

});









module.exports = app;
app.listen(3001, () => {
    console.log('server is running on port 3001');
});
