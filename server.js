/*
 * Server for /pengo
 *
 * © 2017 Team Pengo
 *
 * Authors: Khyati Kulshreshtha,
 *          Monyett Tanzillo,
 *          Claudio Gentile,
 *          Peter Martinson 
*/

'use strict';

/* ============================ SETUP ============================ */

const express       = require('express'),
      app           = express(),
      bodyParser    = require('body-parser'),
      mongoose      = require('mongoose'),
      request       = require('request'),
      cheerio       = require('cheerio'),

      // Local Dependencies
      pengo         = require('./app/pengo'),
      getQuote      = require('./app/getQuote'), // is this needed here?
      initializeQuoteDB = require('./app/initializeQuoteDB'),

      // Global Config
      dotenv        = require('dotenv').config(),
      PORT          = process.env.PORT || 3000,
      url           = process.env.MONGOLAB_URI,

      // Slack Config
      CLIENT_ID     = process.env.CLIENT_ID,
      CLIENT_SECRET = process.env.CLIENT_SECRET;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* ======================= DATABASE CONNECT ======================= */

mongoose.connect(url);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('Db connected successfully');
});

/* ============================= AUTH ============================= */

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

/* ============================ ROUTES ============================ */

app.use(express.static(__dirname + '/public'));     //for landing page

app.get('/',function(req, res){
	res.sendFile(__dirname + '/public');
});

app.post('/', pengo.handleCommand);

// UNCOMMENT TO REPOPULATE QUOTES DATABASE
// app.get('/populate', function(req, res) {
//   initializeQuoteDB();
// });

/* =========================== RUN APP =========================== */

app.listen(PORT, function (){
	console.log('Server is listening to %d port in %s mode',PORT,app.settings.env);
});
