'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const pengo = require('./app/pengo.js');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = app.listen(3000, () => {
  console.log('Express server listening on port %d in %s mode',
   server.address().port,
   app.settings.env);
 });


app.post('/', (request, response) =>{
  let res = pengo.handleCommand(request, response);
  response.json(res);
});

 /*
 response:
 { token: '2P429UXDKLG54EVFDB43',
   team_id: 'fdafdsavs',
   team_domain: 'bot-tests',
   channel_id: 'cewg433dwf',
   channel_name: 'general',
   user_id: 'dwegwgeaw',
   user_name: 'claudgent',
   command: '/pengo',
   text: '' or 'some words',
   response_url: 'https://hooks.slack.com/commands/--- }
 */
