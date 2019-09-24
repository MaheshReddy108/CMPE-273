const express = require("express");
const mysql = require("mysql");
const app = express();

//Create Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: "grubhub"
  });

  db.connect((err)=>{
     if(err){
       throw err;
     }
     console.log('Mysql connected');
     
  });

  app.listen("3500", () => {
    console.log("Server started on 3500");
  });