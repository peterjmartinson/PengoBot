/*
 * Return query for one quote
 *
 *
 * Problem:  How to end execution without Ctrl-c?
 *
 * Author: Peter Martinson
 * Date:   March 10, 2017
*/

module.exports = mongoose.Schema({
  quote_id:       Number,
  source:         String,
  source_href:    String,
  quote:          String,
  quote_href:     String,
  subquote:       String,
  subquote_href:  String
});

