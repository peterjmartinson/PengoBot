'use strict';
//dependencies
const express = require('express');
//const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const app = express();
//const pengo = require('./pengo');

var url = process.env.MONGOLAB_URI;
mongoose.connect(url);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('Db connected successfully');
});

//global config
var PORT = process.env.PORT || 3000;

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',function(req,res){
res.send('In root directory');
});

app.get('/:id', function(req,res){
res.send('in'+ req.params.id);
});

app.listen(PORT, function(){
	console.log('Server is listening to %d port in %s mode',PORT,app.settings.env);
});
