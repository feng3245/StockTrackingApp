Array.prototype.contains = function(v) {
    for(var i = 0; i < this.length; i++) {
        if(this[i] === v) return true;
    }
    return false;
};

Array.prototype.unique = function() {
    var arr = [];
    for(var i = 0; i < this.length; i++) {
        if(!arr.contains(this[i])) {
            arr.push(this[i]);
        }
    }
    return arr; 
}

linkParser = function(htmlData)
{

	var data = htmlData;
	this.getJobs = function()
	{
		var jobsList = new Array();
		//Work with data
		return jobsList;
	}
	this.getMatchingLinkSections = function(tag,cssClass,extraParam)
	{
		var tagCount = this.getTags(tag,cssClass).length;
		var tags = this.getTags(tag,cssClass).unique();
		var matchingLinkBlocks = new Array();
		var i;
		for(i=0;i<tagCount; i++)
		{
			matchingLinkBlocks = matchingLinkBlocks.concat(this.getMatchingBlocks(tags[i], data));
		}
		return matchingLinkBlocks;

	}
	this.getTags = function(tag, cssClass)
	{
		var pattern = new RegExp("<"+tag+"[^>]*class=\""+cssClass+"\"[^>]*>", "g");
		return data.match(pattern).unique();
	}
	this.getMatchingBlocks = function(tagString, htmlBlock)
	{
		
		var numberOfBlocks = htmlBlock.match(new RegExp(tagString,"g")).length;
		var tmpHtmlBlock = htmlBlock;
		var matchingBlocks = new Array();
		for(i=0;i<numberOfBlocks;i++)
		{
			var nestLevel = 1;
			var Block = tagString;

			tmpHtmlBlock = tmpHtmlBlock.substring(tmpHtmlBlock.indexOf(tagString)+tagString.length);
			while(nestLevel > 0)
			{
				var nonHtmlTagDataPattern = new RegExp("^[^<>]*","i");
				var openingTagPattern = new RegExp("^<[^/][^<]*>","i");
				var closingTagPattern = new RegExp("^</[^<]*>","i");
				if(tmpHtmlBlock.match(nonHtmlTagDataPattern)!=""&&tmpHtmlBlock.match(nonHtmlTagDataPattern)!=null)
				{
					Block+=tmpHtmlBlock.match(nonHtmlTagDataPattern);
					tmpHtmlBlock = tmpHtmlBlock.substring(tmpHtmlBlock.indexOf(tmpHtmlBlock.match(nonHtmlTagDataPattern))+tmpHtmlBlock.match(nonHtmlTagDataPattern)[0].length);			
					
				}
				if(tmpHtmlBlock.match(openingTagPattern)!=""&&tmpHtmlBlock.match(openingTagPattern)!=null)
				{
					Block+=tmpHtmlBlock.match(openingTagPattern);
					tmpHtmlBlock = tmpHtmlBlock.substring(tmpHtmlBlock.indexOf(tmpHtmlBlock.match(openingTagPattern))+tmpHtmlBlock.match(openingTagPattern)[0].length);
					nestLevel++;
				}
				if(tmpHtmlBlock.match(closingTagPattern)!=""&&tmpHtmlBlock.match(closingTagPattern)!=null)
				{
					Block+=tmpHtmlBlock.match(closingTagPattern);
					tmpHtmlBlock = tmpHtmlBlock.substring(tmpHtmlBlock.indexOf(tmpHtmlBlock.match(closingTagPattern))+tmpHtmlBlock.match(closingTagPattern)[0].length);
					nestLevel--;
				}
				
			}
			matchingBlocks.push(Block);
		}
		return matchingBlocks;

	}

}