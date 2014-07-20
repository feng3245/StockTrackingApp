Package.describe({
summary: "Simple webscrape package"
});
Npm.depends({"chai": "1.8.1"});

Package.on_use(function(api){
api.use(["underscore", "templating"], "client");	
api.add_files(["webscrapeHelper.js", "./libs/jobSiteParse.js","./libs/jobSiteParse.js", "./libs/jobSiteHelper.js", "./libs/siteParserFactory.js"], "server");
api.registered_extensions(["linkParser", "indeedParse", "indeedSiteHelper", ], "server");
});