scrappedData = new Meteor.Collection("ScrappedData");
applicationUID = undefined;
opTime = undefined
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
        scrappedData.insert({category:"jobDone", appId: applicationUID+"", status: "notDone"});
        var d = new Date();
        var frontOpTime = d.getTime(); 
        var d2 = new Date();
        opTime = d2.getTime();

        Meteor.call("serverAppIDSync", applicationUID);
        Meteor.call("serverOpTimeSync", opTime);        
        scrappedData.insert({category:"jobSearchData", appId:applicationUID+"", jobTitle:Session.get("JobTitle"), city:Session.get("City"), province:Session.get("Province"), startTime: opTime}, 
          function(err,db){
            if(!err){
          var displayFile = setInterval(
          function()
          {
          
            if(scrappedData.findOne({category:"jobSearchResult", appId: applicationUID+"", finTime: opTime})!=undefined)
            {
                $("#Results").html("");
                $("#Results").html(scrappedData.findOne({category:"jobSearchResult", appId: applicationUID+"", finTime: opTime}).data);
                console.log(scrappedData.findOne({category:"jobSearchResult", appId: applicationUID+"", finTime: opTime})) ;
                clearInterval(displayFile);
            }

                
          },100
          );
        }
      }
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
    },
    serverOpTimeSync: function(time)
    {
      opTime = time;
    }

  });
  Meteor.startup(function () {
    
      Meteor.setInterval(function()
        {
        if(applicationUID != undefined)
          
          var jobQuery = scrappedData.findOne({category:"jobSearchData", appId: applicationUID+"", startTime: opTime});

            if(jobQuery)
              {
                console.log(jobQuery);
                 
            
                  var indeedHelper = new indeedSiteHelper(jobQuery.jobTitle, jobQuery.city, jobQuery.province);
                  scrape(indeedHelper.getJobSiteLink(), opTime);
                             scrappedData.remove({category:"jobSearchResult", appId: applicationUID}); 
                 var d = new Date();
                 var scrapeResult = scrappedData.findOne({category:"content", startTime: opTime});
                  if(scrapeResult!=undefined)
                  {

                      scrappedData.insert({category:"jobSearchResult", appId: applicationUID, data: assembleLinks(indeedParse(scrappedData.findOne({category:"content", startTime: opTime}).content), "http://ca.indeed.com/"), finTime: opTime});  
                      
                 console.log(indeedParse(scrapeResult.content));
                  scrappedData.remove({category:"jobSearchData", appId: applicationUID+""});
                 scrappedData.remove({category:"jobDone", appId: applicationUID+""});
                 scrappedData.insert({category:"jobDone", appId: applicationUID+"", status: "Done", finTime: opTime });
                  
                  }
                 else
                  return;
                  
                 
                 
              }
          }
          ,100);
    
    
   
    //saveFile(scrappedData.findOne({category:"content"}).content, "whatever", "./", "ANSI");
    //scrape("http://ca.indeed.com/jobs?q=hr+assistant&l=Toronto,+ON&rq=1&fromage=last");
    
    //console.log(indeedParse(scrappedData.findOne({category:"content"}).content));

  });
}
