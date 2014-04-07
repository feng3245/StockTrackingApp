scrappedData = new Meteor.Collection("ScrappedData");
if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to StockTrackingApp.";
  };

  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });
}

if (Meteor.isServer) {
   
  Meteor.startup(function () {
     
    fs = Npm.require('fs');
    path = "./";
    fs.writeFile(name = (path + "whatever"), scrappedData.findOne({category:"content"}).content, encoding = "utf8", function(err) {
    if (err) {
      throw (new Meteor.Error(500, 'Failed to save file.', err));
    } else {
      console.log('The file ' + name + ' (' + encoding + ') was saved to ' + path);
    }
  });
    //saveFile(scrappedData.findOne({category:"content"}).content, "whatever", "./", "ANSI");
    scrape("http://ca.indeed.com/jobs?q=hr+assistant&l=Toronto,+ON&rq=1&fromage=last");
    
    console.log(indeedParse(scrappedData.findOne({category:"content"}).content));

  });
}
