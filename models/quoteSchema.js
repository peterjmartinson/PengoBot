/*
 * Create the Mongoose schema
 *
 * Author: Peter Martinson
 * Date:   March 10, 2017
*/
var mongoose = require('mongoose');

module.exports = mongoose.Schema({
  quote_id:       Number,
  source:         String,
  source_href:    String,
  quote:          String,
  quote_href:     String,
  subquote:       String,
  subquote_href:  String
});

