require("./jobSiteParser.js");
siteParserFactory = function()
{
	this.getParserFromSiteLink = function(sitelink)
	{

		if((""+sitelink).indexOf("indeed")!=-1)
		{
			return new indeedJobSiteParser();
		}
		return new jobSiteParser();
	}	


}