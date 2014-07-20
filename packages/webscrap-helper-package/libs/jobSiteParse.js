require('./siteParserFactory.js');
indeedParse = function(htmlData)
{
	var parser = new linkParser(htmlData);
	var definitionList = [{tag:"div", cssClass:"\"row \""},{tag:"h2", cssClass:"jobtitle"}];
	return parser.getJobLinks(definitionList, linkFindingFunction);
}
assembleLinks = function(joblinks, jobSite)
{
	var parser = new linkParser();
	return parser.getJobLinkAnchors(joblinks, jobSite);
}
getJobPosts = function(htmlData, fullJobLinks, jobSite)
{
	var parser = new linkParser(htmlData);
	var definitionList = [{tag:"div", cssClass:"\"row \""}];
	var siteparser = new siteParserFactory().getParserFromSiteLink(jobSite);
	return siteparser.parseContent(parser.getJobLinks(definitionList, postFindingFunction));
}
linkFindingFunction = function(htmlBlocks)
{
	
	var linkPattern = new RegExp("<a[^>]*itemprop=\"title\"[^>]*>", "i");
	var textLinkPattern = new RegExp("href=\"[^\"]*\"", "i");
	var linkStringPattern = new RegExp("\"[^\"]*\"");
	var links = new Array();
	htmlBlocks.forEach(function(element,index,array){
		var link = element.match(linkPattern);
		if(link!=undefined)
		{
		var linkHref = link[0].match(textLinkPattern);
		var stringLink = linkHref[0].match(linkStringPattern);
		link = stringLink[0].replace("\"","");
		links.push(link);
		}
	});	
	return links;

}
postFindingFunction = function(htmlBlocks)
{

	return htmlBlocks;
}