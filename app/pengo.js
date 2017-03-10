'use strict';

// TODO
// /pengo - respond with random tip text from database
// /pengo [ID] - respond with tip text from database specified by ID
// /pengo rant - resond with special JPEG
// /pengo help - responds with helpful tips on using /pengo commands

const pengo =  {
  handleCommand: function(request, response) {

    // request exists
    if (request.body.text) {

      // /pengo rant
      if (request.body.text === 'rant') {
        let rant = 'I hate everything. (rant)';
        let data = {
          response_type: 'in_channel', // public to the channel
          text: rant
        }
        return data;
      }
      // /pengo [id]
      else if (request.body.text === '5' ){
        let idQuote = 'Specific quote';
        let data = {
          response_type: 'in_channel', // public to the channel
          text: idQuote
        }
        return data;
      }

      // /pengo help
      else if (request.body.text === 'help'){
        let help = 'No one can hear you scream in space';
        let data = {
          response_type: 'in_channel', // public to the channel
          text: help
        }
        return data;
      }
    } else {
      // /pengo, when response.body.text = ''
      let randomQuote = 'Life is like a box of chocolates';
      let data = {
        response_type: 'ephemeral', // private message
        text: randomQuote
      }
      return data;
    }
  }
}





module.exports = pengo;
