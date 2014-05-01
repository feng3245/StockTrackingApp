scrappedData = new Meteor.Collection("ScrappedData");
applicationUID = undefined;

if (Meteor.isClient) {
  
  Template.SearchJobs.events({
    'click #JobSearch' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
      {
        if(applicationUID === undefined)
        {
          Session.set("applicationUID", Meteor.uuid());
          applicationUID = Session.get("applicationUID");
        }

        Meteor.call("serverAppIDSync", applicationUID);
        

        scrappedData.insert({category:"jobSearchData", appId:applicationUID+"", jobTitle:Session.get("JobTitle"), city:Session.get("City"), province:Session.get("Province")});
        
        var displayFile = setInterval(
          function()
          {
            if(scrappedData.findOne({category:"jobSearchResult", appId: applicationUID+""})!=undefined)
            {
                $("#Results").html(scrappedData.findOne({category:"jobSearchResult", appId: applicationUID+""}).data);
                
                clearInterval(displayFile);
            }

                
          },100
          );
        //scrappedData.remove({category:"fileName", appId: applicationUID+""});
        
      }
    },
    'focusout #JobTitle' : function(e,t)
    {
        Session.set("JobTitle", e.target.value);
    },
    'focusout #City' : function(e,t)
    {
        Session.set("City", e.target.value);
    },
    'focusout #Province' : function(e,t)
    {
        Session.set("Province", e.target.value);
    }
  });
function downloadURL(url) {
    var hiddenIFrameID = 'hiddenDownloader',
        iframe = document.getElementById(hiddenIFrameID);
    if (iframe === null) {
        iframe = document.createElement('iframe');
        iframe.id = hiddenIFrameID;
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
    }
    iframe.src = url;
};
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
    
      Meteor.setInterval(function()
        {
        if(applicationUID != undefined)
          
          var jobQuery = scrappedData.findOne({category:"jobSearchData", appId: applicationUID+""});
            
            if(jobQuery)
              {
                  scrappedData.remove({category:"jobSearchData", appId: applicationUID+""});
                  var indeedHelper = new indeedSiteHelper(jobQuery.jobTitle, jobQuery.city, jobQuery.province);
                  scrape(indeedHelper.getJobSiteLink());
                  scrappedData.insert({category:"jobSearchResult", appId: applicationUID, data: indeedParse(scrappedData.findOne({category:"content"}).content)});
                  // fs = Npm.require('fs');
                  // path = "./public/";
                  // fs.writeFile(name = (path + "whatever"+jobQuery.appId), indeedParse(scrappedData.findOne({category:"content"}).content), encoding = "utf8", 
                  // function(err) 
                  // {
                  //   if (err) 
                  //   {
                  //     throw (new Meteor.Error(500, 'Failed to save file.', err));
                  //   } 
                  //   else 
                  //   {
                      
                  //   }
                  // });
                  // scrappedData.insert({category:"fileName", appId:applicationUID+"", fileName:"whatever"+jobQuery.appId});
              }
          }
          ,100);
    
    
   
    //saveFile(scrappedData.findOne({category:"content"}).content, "whatever", "./", "ANSI");
    //scrape("http://ca.indeed.com/jobs?q=hr+assistant&l=Toronto,+ON&rq=1&fromage=last");
    
    //console.log(indeedParse(scrappedData.findOne({category:"content"}).content));

  });
}
