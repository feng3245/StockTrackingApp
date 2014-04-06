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
    scrape("http://ca.indeed.com/");
    console.log(scrappedData.findOne({category:"content"}));
  });
}
