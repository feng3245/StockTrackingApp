if (Meteor.isClient) {

var request = require('request');
var cheerio = require('cheerio');
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
