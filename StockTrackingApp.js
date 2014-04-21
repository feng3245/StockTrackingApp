scrappedData = new Meteor.Collection("ScrappedData");
applicationUID = undefined;

if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to StockTrackingApp.";
  };

  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
      {
        if(applicationUID === undefined)
        {
          Session.set("applicationUID", Meteor.uuid());
          applicationUID = Session.get("applicationUID");
        }
        Meteor.call("serverAppIDSync", applicationUID);
        scrappedData.insert({category:"jobSearchData", appId:applicationUID+""});
        console.log(applicationUID);
        console.log(Session);
      }
    }
  });
}

if (Meteor.isServer) {
//     Email.send({
// from: "feng3245@gmail.com",
// to: "feng3245@gmail.com",
// subject: "Subject",
// text: "Here is some text"
// });
  Meteor.methods({
    serverAppIDSync: function(appId)
    {
      applicationUID = appId;
    }

  });
  Meteor.startup(function () {
    
      Meteor.setInterval(function(){
        if(typeof applicationUID!=undefined)
          console.log(scrappedData.findOne({category:"jobSearchData", appId: applicationUID+""}));
            if(scrappedData.findOne({category:"jobSearchData", appId:applicationUID+""}))
              console.log("application synced");
          },5000);
    
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
