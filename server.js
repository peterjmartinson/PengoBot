'use strict';

/* ========================== VENDOR DEPENDENCIES ========================== */

const express  = require('express');
//const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv   = require('dotenv').config();
const app      = express();


/* =========================== LOCAL DEPENDENCIES ========================== */

const pengo    = require('./app/pengo');


/* ============================= GLOBAL CONFIG ============================= */

const PORT = process.env.PORT || 3000;
const url = process.env.MONGOLAB_URI;

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));


/* ============================ DATABASE CONNECT =========================== */

mongoose.connect(url);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('Db connected successfully');
});


/* ================================= ROUTES ================================ */

app.use(express.static('images'); // for fetching rant image

app.get('/',function(req,res){
  // req.body is for testing.  Dump when Pengo goes live.
  req.body = 
  {
    "token" : "gIkuvaNzQIHg97ATvDxqgjtO",
    "team_id" : "T0001",
    "team_domain" : "example",
    "channel_id" : "C2147483705",
    "channel_name" : "jones",
    "user_id" : "U2147483697",
    "user_name" : "peterjmartinson",
    "command" : "/pengo",
    "text" : "",
    "response_url" : "https://hooks.slack.com/commands/1234/5678"
  }
  pengo.handleCommand(req, res);
});

app.get('/:quote_id', function(req,res){
console.log(req.params.quote_id);
req.body = 
{
  "token" : "gIkuvaNzQIHg97ATvDxqgjtO",
  "team_id" : "T0001",
  "team_domain" : "example",
  "channel_id" : "C2147483705",
  "channel_name" : "jones",
  "user_id" : "U2147483697",
  "user_name" : "peterjmartinson",
  "command" : "/pengo",
  "text" : req.params.quote_id,
  "response_url" : "https://hooks.slack.com/commands/1234/5678"
}
  // console.log(req.body);
  pengo.handleCommand(req, res);
});

/* ================================ RUN APP ================================ */

app.listen(PORT, function(){
	console.log('Server is listening to %d port in %s mode',PORT,app.settings.env);
});
