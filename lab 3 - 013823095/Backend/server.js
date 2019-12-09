const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./GraphqlSchema/schema')
// const mongoose = require('mongoose');
const mongoose = require("./mongoConnection");
const cors = require("cors");

const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));


app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(3001, () => console.log("Server started on port 3001"));