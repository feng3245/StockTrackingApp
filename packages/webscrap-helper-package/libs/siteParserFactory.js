require("./jobSiteParser.js");
siteParserFactory = function()
{
	this.getParserFromSiteLink = function(sitelink)
	{

		if(sitelink == "indeed.ca")
		{
			return new indeedJobSiteParser();
		}
		return new jobSiteParser();
	}	


}