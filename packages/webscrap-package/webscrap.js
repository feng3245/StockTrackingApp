scrape = function()
{

var request = Npm.require('request');
var cheerio = Npm.require('cheerio');

var url = "http://www.imdb.com/chart/";

  request({
              "uri": url
	              }, function(err, resp, body){
		      		  var $ = cheerio.load(body);
				  		  
						  		  var strContent = "";
								            $('th:contains(Gross)').parents('table').find('tr').each(function(index,item){
									               if(index>0)
										                  {
												                var tds = $(item).find('td');
														              strContent += $(tds.eq(1)).find('a').text().trim() + "," 
															      			  + tds.eq(2).text().trim() + "," + tds.eq(3).text().trim()+ "\r\n";
																		             }
																			                });
																							   
																							              console.log(strContent);
																								      return;
																								      }); 
}
