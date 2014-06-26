scrape = function(url, time)
{

	var request = Npm.require('request');
	var cheerio = Npm.require('cheerio');
	var Fiber = Npm.require('fibers');
	completed = false;
	strContent = "";
	request({
		"uri": url
	}, function(err, resp, body){
		var $ = cheerio.load(body);
		Fiber(
			function()
			{


				strContent += body;
				
				scrappedData.remove({ 'category' :"content"});
				scrappedData.insert({category:"content", content:""+strContent, startTime: time});

			}		
			).run();

	});

}
