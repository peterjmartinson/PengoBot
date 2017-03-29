'use strict';

// /pengo - respond with random tip text from database
// /pengo [ID] - respond with tip text from database specified by ID
// /pengo rant - resond with special JPEG
// /pengo help - responds with helpful tips on using /pengo commands
// TODO
// /pengo bash [command] - respond with reference from http://man.he.net


// one function to handle all slack commands (subject to change if needed)

const getQuote   = require('./getQuote'),
      getCommand = require('./getCommand');

const pengo =  {
  handleCommand: function(request, response) {

    // if /pengo includes following text ([id], rant, help, etc.)
    if (request.body.text) {

      // /pengo [ID]
      if ( isNumeric(request.body.text) ){ // TODO add test if id number is in quote db range ex.(1-20)
        getQuote.byID(request.body.text, function(err, quote) {
          if (err) console.error(err);

          let mainQuote = quote[0].quote;
          let quoteId = quote[0].quote_id;
          let quoteSource = quote[0].source;
          let subQuote = quote[0].subquote;

          let data = {
            "response_type": "in_channel", // public to the channel
            "text": "*" + mainQuote + "*",
            "attachments": [
              {
                "text": subQuote,
                "color": "good",
                "footer": quoteSource + " | "  + "#" + quoteId
              }
            ]
          }
          response.send(data);
        });
      }

      // /pengo rant or whatever it's going to be called
      else if (request.body.text === 'rant') {
        let responseURL = "https://pengo.herokuapp.com/rant.png";
        let data = {
          "response_type": "in_channel", // public to the channel
          "attachments": [
            {
              "text": responseURL,
              "color": "warning"
            }
          ]
        }
        // response.send(data);
        response.send(responseText);
      }

      // /pengo help
      else if (request.body.text === 'help'){
        let helpMessage =
        '"/pengo" get a random quote from the Pragmatic Programmer \n' +
        '"/pengo [ID]" you can specifiy a quote by ID number \n' +
        '"/pengo rant" get the most important piece of advice';

        let data = {
          "response_type": "in_channel", // public to the channel
          "attachments": [
            {
              "text": helpMessage,
              "color": "#227722"
            }
          ]
        }
        response.send(data);
      }

// ================ Begin Command Line Help

      else if ( /bash [\w\-\+]+$/mig.test(request.body.text) ) {
        let footerText =
          'You are asking for a command!\n' +
          'The command name is: ' +
          request.body.text.substring(5);
        getCommand(request.body.text.substring(5), function(err, man) {
          if (err) console.error(err);

          let data = {
            "response_type": "in_channel", // public to the channel
            "attachments": [
              {
                "text": man.synopsis,
                "color": "good",
                "footer": footerText
              }
            ]
          }
          response.send(data);
        });
      }

// ================== End Command Line Help

      // /pengo (wrong text)
      else {
        let errorMessage = "Sorry, looks like you typed something in wrong. Try /pengo help.";
        let data = {
          "response_type": "ephemeral", // only visible to user
          "attachments": [
            {
              "text": errorMessage,
              "color": "DANGER DANGER"
            }
          ]
        }
        response.send(data);
      }
    }

    else {
      // /pengo, when response.body.text = ''
      getQuote.atRandom(function(err, quote) {
        if (err) console.error(err);
        // let responseText = quote[0].quote;
        let mainQuote = quote[0].quote;
        let quoteId = quote[0].quote_id;
        let quoteSource = quote[0].source;
        let subQuote = quote[0].subquote;

        let data = {
          "response_type": "in_channel", // public to the channel
          "text": "*" + mainQuote + "*",
          "attachments": [
            {
              "text": subQuote,
              "color": "good",
              "footer": quoteSource + " | "  + "#" + quoteId
            }
          ]
        }
        response.send(data);
      });
    }
  }
}

// tests if string is a number
function isNumeric(value) {
    return /^\d+$/.test(value);
}



module.exports = pengo;
