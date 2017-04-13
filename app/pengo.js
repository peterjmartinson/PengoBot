/*
 * Run logic for /pengo
 *
 * /pengo - respond with random tip text from database
 * /pengo [ID] - respond with tip text from database specified by ID
 * /pengo rant - resond with special JPEG
 * /pengo help - responds with helpful tips on using /pengo commands
 * TODO /pengo bash [command] - respond with reference from http://man.he.net
 *
 * © 2017 Team Pengo
 *
 * Authors: Khyati Kulshreshtha,
 *          Monyett Tanzillo,
 *          Claudio Gentile,
 *          Peter Martinson 
*/

'use strict';

// one function to handle all slack commands (subject to change if needed)

const getQuote   = require('./getQuote'),
      getCommand = require('./getCommand');

const pengo = {

  handleCommand: function(request, response) {

    if (request.body.token !== process.env.VERIFICATION_TOKEN) {
    return; // if request doesn't have a slack token, abort
    }
    // if /pengo includes following text ([id], rant, help, etc.)
    if (request.body.text) {

      /* 
       * /pengo [ID]
       *
       * Returns a specified quote
      */
      if ( isNumeric(request.body.text) ){
        getQuote.byID(request.body.text, function(err, quote) {
          if (err) console.error(err);

          if ( quote.bad_number ) {
            let data = {
              "response_type": "ephemeral",
              "text": "Please enter a number between 1 and " + quote.N,
            }
            response.send(data);
          }
          else {
            let mainQuote = quote[0].quote;
            let quoteId = quote[0].quote_id;
            let quoteSource = quote[0].source;
            let subQuote = quote[0].subquote;
            let quoteSourceUrl = quote[0].source_href;

            let data = {
              "response_type": "in_channel",
              "text": "*" + mainQuote + "*",
              "attachments": [
                {
                  "text": subQuote + "\n" + "<" + quoteSourceUrl + "|" + quoteSource + " #" + quoteId + ">",
                  "color": "good",
                  "footer": "<https://pengo.herokuapp.com | Get Pengo>" + " | "  + "<https://github.com/peterjmartinson/PengoBot | GitHub>",
                  "mrkdwn_in": ["text"]
                }
              ]
            }
            response.send(data);
          }
        });
      }

      /* 
       * /pengo rant
       *
       * Returns an inspirational image
      */
      else if (request.body.text === 'rant') {
        let responseURL = "https://pengo.herokuapp.com/rant.png";
        let data = {
          "response_type": "in_channel",
          "attachments": [
            {
              "image_url": responseURL,
              "color": "warning"
            }
          ]
        }
        response.send(data);
      }

      /* 
       * /pengo help
       *
       * Provides usage instructions
      */
      else if (request.body.text === 'help'){
        let helpMessage =
        '"/pengo" get a random quote from the Pragmatic Programmer \n' +
        '"/pengo [ID]" you can specifiy a quote by ID number \n' +
        '"/pengo rant" get the most important piece of advice';

        let data = {
          "response_type": "ephemeral",
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

      /* 
       * /pengo bash <command>
       *
       * Returns command line syntax
       *   @@@@ IN DEVELOPMENT!!! @@@@
      */
      else if ( /bash [\w\-\+]+$/mig.test(request.body.text) ) {
        let footerText =
          'You are asking for a command!\n' +
          'The command name is: ' +
          request.body.text.substring(5) +
          '\nBut this function is still in development!';

        let data = {
          "response_type": "ephemeral",
          "attachments": [
            {
              "text": "Whoops!",
              "color": "good",
              "footer": footerText
            }
          ]
        }
        response.send(data);
        // getCommand(request.body.text.substring(5), function(err, man) {
        //   if (err) console.error(err);

        //   let data = {
        //     "response_type": "in_channel", // public to the channel
        //     "attachments": [
        //       {
        //         "text": man.synopsis,
        //         "color": "good",
        //         "footer": footerText
        //       }
        //     ]
        //   }
        //   response.send(data);
        // });
      }

// ================== End Command Line Help

      /* 
       * /pengo ERROR
       *
       * Returns a friendly error message
      */
      else {
        let errorMessage = "Sorry, looks like you typed something in wrong. Try /pengo help.";
        let data = {
          "response_type": "ephemeral",
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

    /* 
     * /pengo
     *
     * Returns a random message
    */
    else {
      getQuote.atRandom(function(err, quote) {
        if (err) console.error(err);
        let mainQuote = quote[0].quote;
        let quoteId = quote[0].quote_id;
        let quoteSource = quote[0].source;
        let subQuote = quote[0].subquote;
        let quoteSourceUrl = quote[0].source_href;

        let data = {
          "response_type": "in_channel",
          "text": "*" + mainQuote + "*",
          "attachments": [
            {
              "text": subQuote + "\n" + "<" + quoteSourceUrl + "|" + quoteSource + " #" + quoteId + ">",
              "color": "good",
              "footer": "<https://pengo.herokuapp.com | Get Pengo>" + " | "  + "<https://github.com/peterjmartinson/PengoBot | GitHub>",
              "mrkdwn_in": ["text"]
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
