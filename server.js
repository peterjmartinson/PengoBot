'use strict';

/* ========================== VENDOR DEPENDENCIES ========================== */

const express  = require('express');
const bodyParser = require('body-parser');
const request = require('request');
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

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


/* ============================ DATABASE CONNECT =========================== */

mongoose.connect(url);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('Db connected successfully');
});

/* ================================= AUTH ================================== */

app.get('/auth', function(req, res) {
	// if slack oauth access denied
	if (!req.query.code) {
    	res.redirect('https://pengo.herokuapp.com/'); // return to landing page
		return;
  	}

	let code = req.query.code;

	request.get(`https://slack.com/api/oauth.access?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}&redirect_uri=${escape('https://pengo.herokuapp.com/auth')}`,
	function(error, result) {
		if (error) {
			res.send('Error, try again later.');
    	}
		// get auth token
		let token = result.body.access_token;
		res.send('Pengo Added.');
	});
});

/* ================================= ROUTES ================================ */

app.use(express.static('images')); // for fetching rant image
app.use(express.static(__dirname + '/public'));//for landing page

app.get('/',function(req,res){
	res.sendFile(__dirname + '/public');
	console.log(__dirname);//for the landing page
});
app.post('/',function(req,res) {
  	pengo.handleCommand(req, res);
});

/* ================================ RUN APP ================================ */

app.listen(PORT, function (){
	console.log('Server is listening to %d port in %s mode',PORT,app.settings.env);
});
