require("../npmSupport.js");
require("../webscrapeHelper.js");
var expect = require("../.npm/node_modules/chai/chai.js").expect
var parser = new linkParser();

describe("getMatchingLinkSections(tag,class,extraParam)",function(){
		
	 	it("Should return div on the second level with divs inside of it",
	 		function()
	 		{
	 			parser = new linkParser( "<div class=\"blah\"><div class=\"shit\"><div class=\"whatever\">sdfsdfsfd</div></div></div>");
	 			expect(parser.getMatchingLinkSections("div","shit")[0]).to.equal("<div class=\"shit\"><div class=\"whatever\">sdfsdfsfd</div></div>");

	 		}
	 		);

	 	

	 	it("Should return multiple div of different sections given they match",
	 		function()
	 		{
	 			parser = new linkParser( "<div class=\"blah\"><div class=\"shit\"><div class=\"whatever\">sdfsdfsfd</div></div></div><div class=\"superknob\"><div class=\"knob\"><div class=\"shit\"><table>blashdfsfsdfsd</table><div class=\"whatever\">sdfsdfsfd</div></div></div></div>");
	 			expect(parser.getMatchingLinkSections("div","shit").length).to.equal(2);
	 			expect(parser.getMatchingLinkSections("div","shit")[0]).to.equal("<div class=\"shit\"><div class=\"whatever\">sdfsdfsfd</div></div>");
	 			expect(parser.getMatchingLinkSections("div","shit")[1]).to.equal("<div class=\"shit\"><table>blashdfsfsdfsd</table><div class=\"whatever\">sdfsdfsfd</div></div>");
	 		}
	 		);
	 }
	);
describe("getTags(tag,class)", function(){

		it("Should return the first div",
	 		function()
	 		{
	 			parser = new linkParser( "<div class=\"blah\"><div class=\"shit\"><div class=\"whatever\">sdfsdfsfd</div></div></div>");
	 			expect(parser.getTags("div","shit")[0]).to.equal("<div class=\"shit\">");

	 		}
	 		);
		it("Should only return unique tags",
			function()
			{
				parser = new linkParser( "<div class=\"blah\"><div class=\"shit\"><div class=\"whatever\">sdfsdfsfd</div></div></div><div class=\"shit\"><div class=\"whatever\">sdfsdfsfd</div></div>");
	 			expect(parser.getTags("div","shit").length).to.equal(1);


			});
		it("Should return multiple tags when they are different", 
			function()
			{
				parser = new linkParser( "<div class=\"blah\"><div class=\"shit\"><div class=\"whatever\">sdfsdfsfd</div></div></div><div class=\"shit\" blah=\"different\"><div class=\"whatever\">sdfsdfsfd</div></div>");
				expect(parser.getTags("div","shit").length).to.equal(2);
				expect(parser.getTags("div","shit")[0]).to.equal("<div class=\"shit\">");
				expect(parser.getTags("div","shit")[1]).to.equal("<div class=\"shit\" blah=\"different\">");
			}
			);
}
);
describe("getMatchingBlocks(tagString, htmlBlock)", function()
{
	it("Should return a matching block that closes the current tag", function()
	{

		expect(parser.getMatchingBlocks("<div class=\"shit\">", "<div class=\"blah\"><div class=\"shit\"><div class=\"whatever\">sdfsdfsfd</div></div></div>")[0])
		.to.equal("<div class=\"shit\"><div class=\"whatever\">sdfsdfsfd</div></div>");
	});
	it("Should return 2 matching blocks each with the same match", function()
	{

		expect(parser.getMatchingBlocks("<div class=\"shit\">", "<div class=\"blah\"><div class=\"shit\"><div class=\"whatever\">sdfsdfsfd</div></div></div><div class=\"blah\"><div class=\"shit\"><div class=\"whatever\">sdfsdfsfd</div></div></div>").length)
		.to.equal(2);
		expect(parser.getMatchingBlocks("<div class=\"shit\">", "<div class=\"blah\"><div class=\"shit\"><div class=\"whatever\">sdfsdfsfd</div></div></div><div class=\"blah\"><div class=\"shit\"><div class=\"whatever\">sdfsdfsfd</div></div></div>")[0])
		.to.equal("<div class=\"shit\"><div class=\"whatever\">sdfsdfsfd</div></div>");
		expect(parser.getMatchingBlocks("<div class=\"shit\">", "<div class=\"blah\"><div class=\"shit\"><div class=\"whatever\">sdfsdfsfd</div></div></div><div class=\"blah\"><div class=\"shit\"><div class=\"whatever\">sdfsdfsfd</div></div></div>")[1])
		.to.equal("<div class=\"shit\"><div class=\"whatever\">sdfsdfsfd</div></div>");
	});
});

