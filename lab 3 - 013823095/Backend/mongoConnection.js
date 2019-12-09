var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://mahesh:Mahesh1896@cluster0-nu1yk.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, poolSize: 100, 'useCreateIndex': true }, (err) => {
  if (err) {
    console.log("Could not connect to database", err)
    res.status(500).end("Could not connect to database" + err);
  }
  console.log("mongoose server running");
});

module.exports = { mongoose };