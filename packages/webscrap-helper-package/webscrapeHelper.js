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
Array.prototype.remByVal = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] === val) {
            this.splice(i, 1);
            i--;
        }
    }
    return this;
}
linkParser = function(htmlData)
{

	var data = htmlData;
	this.getJobLinks = function(matchDefinitionList,linkFindingFunction)
	{
		return linkFindingFunction(this.getRecusivelyMatchingSections(matchDefinitionList));	
	}
	this.getRecusivelyMatchingSections = function(matchDefinitionList)
	{
		var survivingBlocks = this.getMatchingLinkSections(matchDefinitionList[0].tag, matchDefinitionList[0].cssClass);
		
		var remainingDefinitions = matchDefinitionList.slice(1);
		var getTagsFunc = this.getTags;
		remainingDefinitions.forEach(function(element,index,array){
			var tag = element.tag;
			var cssClass = element.cssClass;
			survivingBlocks.forEach(function(element,index,array){
				if(!(getTagsFunc(tag,{cssclass:cssClass+""}, element).length>0))
				{
					survivingBlocks.remByVal(element);
				}
			});

		});
		return survivingBlocks;
	}
	this.getJobLinkAnchors = function(joblinks, jobSite)
	{
		var anchorLinks = new Array();
		joblinks.forEach(function(element,index,array){anchorLinks.push("<a href='"+jobSite.replace(/^[/]+|[/]+$/gm,'').replace(/^[\\]+|[\\]+$/gm,'')+element.replace("\"",'')+"' target='_blank'>"+jobSite.replace(/^[/]+|[/]+$/gm,'').replace(/^[\\]+|[\\]+$/gm,'')+element.replace("\"",'')+"</a><br />");});	
		return anchorLinks;
	}
	this.getMatchingLinkSections = function(tag,cssClass,extraParam)
	{
		var tagCount = this.getTags(tag,{cssclass:cssClass+""}, data).length;
		
		var tags = this.getTags(tag,{cssclass:cssClass+""}, data).unique();
		var matchingLinkBlocks = new Array();
		var i;
		for(i=0;i<tagCount; i++)
		{
			matchingLinkBlocks = matchingLinkBlocks.concat(this.getMatchingBlocks(tags[i], data));
		}
		return matchingLinkBlocks;

	}
	this.getTags = function(tag, tagAttr, htmlData)
	{
		
		var pattern = new RegExp("<"+tag+"[^>]*class="+tagAttr.cssclass+"[^>]*>", "g");
		if(tagAttr._id!=undefined)
		{
			if(tagAttr.cssclass!=undefined)
			{

				var pattern1 = new RegExp("<"+tag+"[^>]*id="+tagAttr._id+"[^>]*class="+tagAttr.cssclass+"[^>]*>", "g");
			var pattern2 = new RegExp("<"+tag+"[^>]*class="+tagAttr.cssclass+"[^>]*id="+tagAttr._id+"[^>]*>", "g");
			return htmlData.match(pattern1) == null?htmlData.match(pattern2).unique():htmlData.match(pattern1).unique();
			}
			var idsearchpattern = new RegExp("<"+tag+"[^>]*id=\""+tagAttr._id.replace(new RegExp("\"","g"),"")+"[^\"]*\"[^>]*>", "g");
			
			var goodmatches = new Array();
			htmlData.match(idsearchpattern).forEach(function(entry){if(entry!=null&& entry!=undefined)goodmatches.push(entry);});
			
			return goodmatches.unique();
			

		}
		if(htmlData.match(pattern) == null)
			return [];
		return htmlData.match(pattern).unique();
	}
	this.getMatchingBlocks = function(tagString, htmlBlock)
	{
		
		var tempblock = htmlBlock;
		var numberOfBlocks = 0;
		while(tempblock.indexOf(tagString)!=-1)
		{
			tempblock = tempblock.replace(tagString,"");
			numberOfBlocks++;
		}

		var tmpHtmlBlock = htmlBlock;
		var matchingBlocks = new Array();
		
		for(i=0;i<numberOfBlocks;i++)
		{
			var nestLevel = 1;
			var Block = tagString;

			tmpHtmlBlock = tmpHtmlBlock.substring(tmpHtmlBlock.indexOf(tagString)+tagString.length);
			
			
			try
			{
				var iterationCount = 0;
				while(nestLevel > 0)
				{
					(function()
					{
						var nonHtmlTagDataPattern = new RegExp("^[^<>]*","i");
						var openingTagPattern = new RegExp("^<[^/][^<]*>","i");
						var closingTagPattern = new RegExp("^</[^<]*>","i");
						var htmlComment = new RegExp("^<!--[^>]*-->","i");
						var brTags = new RegExp("^<br[^>]*[/]?>","i");
						if(tmpHtmlBlock.match(nonHtmlTagDataPattern)!=""&&tmpHtmlBlock.match(nonHtmlTagDataPattern)!=null)
						{


							Block+=tmpHtmlBlock.match(nonHtmlTagDataPattern);
							tmpHtmlBlock = tmpHtmlBlock.substring(tmpHtmlBlock.indexOf(tmpHtmlBlock.match(nonHtmlTagDataPattern))+tmpHtmlBlock.match(nonHtmlTagDataPattern)[0].length);			
							return;	
						}
						if(tmpHtmlBlock.match(htmlComment)!=""&&tmpHtmlBlock.match(htmlComment)!=null)
						{
						
							Block+=tmpHtmlBlock.match(htmlComment);
							tmpHtmlBlock = tmpHtmlBlock.substring(tmpHtmlBlock.indexOf(tmpHtmlBlock.match(htmlComment))+tmpHtmlBlock.match(htmlComment)[0].length);			
							return;
						
						}
						if(tmpHtmlBlock.match(brTags)!=""&&tmpHtmlBlock.match(brTags)!=null)
						{
							Block+=tmpHtmlBlock.match(brTags);
							tmpHtmlBlock = tmpHtmlBlock.substring(tmpHtmlBlock.indexOf(tmpHtmlBlock.match(brTags))+tmpHtmlBlock.match(brTags)[0].length);			
							return;	

						}
						if(tmpHtmlBlock.match(openingTagPattern)!=""&&tmpHtmlBlock.match(openingTagPattern)!=null)
						{
						

							Block+=tmpHtmlBlock.match(openingTagPattern);
							tmpHtmlBlock = tmpHtmlBlock.substring(tmpHtmlBlock.indexOf(tmpHtmlBlock.match(openingTagPattern))+tmpHtmlBlock.match(openingTagPattern)[0].length);
							nestLevel++;
							return;

						}
						if(tmpHtmlBlock.match(closingTagPattern)!=""&&tmpHtmlBlock.match(closingTagPattern)!=null)
						{
						

							Block+=tmpHtmlBlock.match(closingTagPattern);
							tmpHtmlBlock = tmpHtmlBlock.substring(tmpHtmlBlock.indexOf(tmpHtmlBlock.match(closingTagPattern))+tmpHtmlBlock.match(closingTagPattern)[0].length);
							nestLevel--;
							return;
						}
						iterationCount++;

						
					})();
					
				}
				matchingBlocks.push(Block);
			}
			catch(err)
			{
				console.log(err.message);
			}

		}
		
		return matchingBlocks;

	}

}