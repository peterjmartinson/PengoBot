/*
 * getCommand(command, callback)
 * 
 * pass a Bash command to getCommand, and receive
 * the main parts of the relevant man page!
 *
 * © 2017 Team Pengo
 *
 * Authors: Khyati Kulshreshtha,
 *          Monyett Tanzillo,
 *          Claudio Gentile,
 *          Peter Martinson 
*/


const request = require('request'),
      cheerio = require('cheerio'),
      baseURL = 'http://man.he.net/man1/';

// get the command text from the URL
var fetchCommand = function(command, callback) {
  var mainURL = baseURL + command;
  request(mainURL, function(error, response, html) {
    if (error) callback(error);
    var $ = cheerio.load(html);
    callback(null, $('pre').html());
  });
}

module.exports = function(command, callback) {
  fetchCommand(command, function(error, man) {
    if (error) callback(error);

    var commandArray = man.split('\n'),
        toc          = [],
        sections     = [];

    // create TOC numbers
    commandArray.forEach(function(element, index) {
      if ( /^[A-Z]/.test(element) ) {
        toc.push(index);
      }
    });

    // create TOC section labels
    toc.forEach(function(element) {
      sections.push(commandArray[element]);
    });

    function createSection(title) {
      return commandArray.filter(function(element, index) {
        var sectionIndex    = toc[sections.indexOf(title.toUpperCase())];
        var nextSectionIndex = toc[sections.indexOf(title.toUpperCase())+1];
        if ( index > sectionIndex && index < nextSectionIndex ) {
          return element;
        }
      }).join('\n');
    }

    callback(null, {
      synopsis    : createSection('synopsis'),
      description : createSection('description'),
      options     : createSection('options'),
      examples    : createSection('examples')
    });
  });
}

