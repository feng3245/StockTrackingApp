Package.describe({
summary: "Simple webscrape package"
});
Npm.depends({
"cheerio": "0.13.1"}
,{"request": "2.34.0"
});

Package.on_use(function(api){
api.use(["underscore", "templating"], "client");
api.add_files("webscrap.js", "server");
api.registered_extensions("scrape", "server");
});
