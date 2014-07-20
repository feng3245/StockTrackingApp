

jobSiteParser = function()
{
	
}
indeedJobSiteParser = function()
{

}

 indeedJobSiteParser.prototype.ParseFilterData = function(){
		var parserfilters = new Array();
		parserfilters.push(new function(){this.tag = "a", this._id = "tog"});
		parserfilters.push(new function(){this.tag = "span", this._id = "savelink"});
		parserfilters.push(new function(){this.tag = "span", this._id = "block"});
		
		return parserfilters;
	}
indeedJobSiteParser.prototype.parseContent = function(htmlDataBlocks)
{
	var linkpase = new linkParser();
	var datablocks = new Array();
	htmlDataBlocks.forEach(function(entry){
		var cleanedEntry = entry.replace(new RegExp('\"','g'),'"').replace(new RegExp('\n','g'),' ').replace(new RegExp(">[\\s]*",'g'),'>').replace(new RegExp("[\\s]*<",'g'),'<');
		indeedJobSiteParser.prototype.ParseFilterData().forEach(function(pf){
			cleanedEntry = cleanedEntry.replace(linkpase.getMatchingBlocks(linkpase.getTags(pf.tag, pf, cleanedEntry)[0],cleanedEntry)[0], '');

		});
		datablocks.push(
		 cleanedEntry
			);
	});

	return datablocks;
}

 jobSiteParser.prototype.ParseFilterData = function(){
		return new Array();
	} 

