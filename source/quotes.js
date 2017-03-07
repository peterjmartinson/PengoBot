/*
 * quotes.js
 * 
 * Define the usable MongoDB schema for the Quotes database.
 * Used by the /pengo Slack command.
 *
 * Created: March 7, 2017
 * Authors: Peter Martinson, etc.
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuoteSchema = new Schema({
  source: String,
  source-href: String,
  quote: String,
  quote-href: String,
  subquote: String,
  subquote-href: String
}

module.exports = mongoose.model('Quote', QuoteSchema);
