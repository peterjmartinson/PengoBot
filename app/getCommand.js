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
      base_url = 'http://man.he.net/man1/';

// get the command text from the URL
var fetchCommand = function(command, callback) {
  var main_url = base_url + command;
  request(main_url, function(error, response, html) {
    if (error) callback(error);
    var $ = cheerio.load(html);
    callback(null, $('pre').html());
  });
}

module.exports = function(command, callback) {
  fetchCommand(command, function(error, man) {
    if (error) callback(error);
    if ( !man ) {
      callback('Command not found!');
    }
    else {
      var command_array = man.split('\n'),
          toc          = [],
          sections     = [];

      // create TOC numbers
      command_array.forEach(function(element, index) {
        if ( /^[A-Z]/.test(element) ) {
          toc.push(index);
        }
      });

      // create TOC section labels
      toc.forEach(function(element) {
        sections.push(command_array[element]);
      });

      function createSection(title) {
        var section_index      = toc[sections.indexOf(title.toUpperCase())],
            next_section_index = toc[sections.indexOf(title.toUpperCase())+1],
            long_section_flag  = 0,
            section;
        if ( next_section_index - section_index >= 20 ) {
          next_section_index = section_index + 20;
          long_section_flag = 1;
        }
        section = command_array.filter(function(element, index) {
          if ( index > section_index && index < next_section_index ) {
            return element;
          }
        }).join('\n');
        if ( long_section_flag ) {
          section += '\r\r        _...section clipped! See ' + base_url + command + ' for complete text._';
        }
        return section
      }

      callback(null, {
        syntax      : createSection('synopsis'),
        description : createSection('description'),
        options     : createSection('options'),
        examples    : createSection('examples'),
        source_href : base_url + command
      });
    }
  });
}

