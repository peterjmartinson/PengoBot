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

var Quote = new Schema({
  quote-id:      { type: Number },
  source:        { type: String },
  source-href:   { type: String },
  quote:         { type: String },
  quote-href:    { type: String },
  subquote:      { type: String },
  subquote-href: { type: String }
}

module.exports = mongoose.model('Quote', QuoteSchema);
