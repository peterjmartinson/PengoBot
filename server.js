'use strict';

/* ========================== VENDOR DEPENDENCIES ========================== */

const express  = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv   = require('dotenv').config();
const app      = express();

const request    = require('request');
const cheerio    = require('cheerio');

/* =========================== LOCAL DEPENDENCIES ========================== */

const pengo    = require('./app/pengo');
const getQuote = require('./app/getQuote'); // is this needed here?


/* ============================= GLOBAL CONFIG ============================= */

const PORT = process.env.PORT || 3000;
const url = process.env.MONGOLAB_URI;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


/* ============================ DATABASE CONNECT =========================== */

mongoose.connect(url);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('Db connected successfully');
});


/* ================================= ROUTES ================================ */

app.use(express.static('images')); // for fetching rant image

app.post('/',function(req,res){
  pengo.handleCommand(req, res);
});

/* ================================ RUN APP ================================ */

app.listen(PORT, function(){
	console.log('Server is listening to %d port in %s mode',PORT,app.settings.env);
});
