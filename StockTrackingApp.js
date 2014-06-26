scrappedData = new Meteor.Collection("ScrappedData");
if (Meteor.isClient) {

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    scrape("http://ca.indeed.com/jobs?q=hr+assistant&l=Toronto,+ON&rq=1&fromage=last");
    Meteor.setInterval(
   function()
   {
    writeToMail = function(content)
  {
        fs = Npm.require('fs');
        path = ".\\..\\..\\..\\..\\inetpub\\mailroot\\Pickup";
    //scrappedData.findOne({category:"content"}).content
    fs.writeFile(name = (path + "whatever"), content, encoding = "utf8", function(err) 
    {
      if (err) 
      {
        throw (new Meteor.Error(500, 'Failed to save file.', err));
      } 
      else 
      {
        console.log('The file ' + name + ' (' + encoding + ') was saved to ' + path);
      }
    });
  }
        if(scrappedData.findOne({category:"content"}).content!=undefined)
        writeToMail(scrappedData.findOne({category:"content"}).content);
  

}      
,30000);
    
  });
}
    
    

