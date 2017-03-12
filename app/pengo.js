'use strict';

// TODO
// /pengo - respond with random tip text from database
// /pengo [ID] - respond with tip text from database specified by ID
// /pengo rant - resond with special JPEG
// /pengo help - responds with helpful tips on using /pengo commands


// one function to handle all slack commands (subject to change if needed)

const pengo =  {
  handleCommand: function(request, response) {

    // if /pengo includes following text ([id], rant, help, etc.)
    if (request.body.text) {

      // /pengo [ID]
      if ( isNumeric(request.body.text) ){ // TODO add test if id number is in quote db range ex.(1-20)
        let idQuote = 'Specific quote';
        let data = {
          response_type: 'in_channel', // public to the channel
          attachments: [
            {
              text: idQuote,
              color: 'good'
            }
          ]
        }
        return data;
      }

      // /pengo rant or whatever it's going to be called
      else if (request.body.text === 'rant') {
        let data = {
          response_type: 'in_channel', // public to the channel
          attachments: [
            {
              text: 'JPEG goes here',
              color: 'warning'
            }
          ]
        }
        return data;
      }

      // /pengo help
      else if (request.body.text === 'help'){
        let helpMessage =
        '"/pengo" get a random quote from the Progmatic Programmer \n' +
        '"/pengo [ID]" you can specifiy a quote by ID number \n' +
        '"/pengo rant" a JPEG with a special quote';

        let data = {
          response_type: 'in_channel', // public to the channel
          attachments: [
            {
              text: helpMessage,
              color: '#227722'
            }
          ]
        }
        return data;
      }

      // /pengo (wrong text)
      else {
        let errorMessage = 'Sorry, looks like you typed something in wrong. Try /pengo help.';
        let data = {
          response_type: 'ephemeral', // only visible to user
          attachments: [
            {
              text: errorMessage,
              color: 'DANGER DANGER'
            }
          ]
        }
        return data;
      }
    }

    else {
      // /pengo, when response.body.text = ''
      let randomQuote = 'Life is like a box of chocolates';
      let data = {
        response_type: 'in_channel', // public to channel
        attachments: [
          {
            text: randomQuote,
            color: 'good'
          }
        ]
      }
      return data;
    }
  }
}

// tests if string is a number
function isNumeric(value) {
    return /^\d+$/.test(value);
}



module.exports = pengo;
