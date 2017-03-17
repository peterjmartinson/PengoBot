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
  res.send('In root directory');
});

app.get('/pengo', function(req, res) {
  pengo.handleCommand(req, res)
});

// user enters 'path/48' to get quote #48
// app.get('/:quote_id', function(req,res){
//   getQuote.byID(req.params.quote_id, function(err, result) {
//     if (err) console.error(err);
//     res.send("Quote #" + req.params.quote_id + " is:<br>" + result);
//   });
// });


/* ================================ RUN APP ================================ */

app.listen(PORT, function(){
	console.log('Server is listening to %d port in %s mode',PORT,app.settings.env);
});
