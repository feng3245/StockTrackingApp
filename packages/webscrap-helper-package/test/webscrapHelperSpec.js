require("../webscrapeHelper.js");
var expect = require("../.npm/node_modules/chai/chai.js").expect;
var parser = new linkParser();


describe("getRecusivelyMatchingSections(matchDefinitionList)", function()
{
	it("Should return nested blocks that match defintion top down from index 0", function()
	{
		parser = new linkParser( "<div class=\"blah\"><div class=\"shit\"><div class=\"whatever\">sdfsdfsfd</div></div><div class=\"whatnot\"></div></div>");
		var matchDefintions = [{tag:"div", cssClass:"\"shit\""},{tag:"div", cssClass:"\"whatever\""}];
		expect(parser.getRecusivelyMatchingSections(matchDefintions)[0]).to.equal("<div class=\"shit\"><div class=\"whatever\">sdfsdfsfd</div></div>");
	});
	it("Should return nothing if there are no nested matchs", function()
	{
		parser = new linkParser( "<div class=\"blah\"><div class=\"shit\"><div class=\"bill\">sdfsdfsfd</div></div><div class=\"whatnot\"></div></div>");
		var matchDefintions = [{tag:"div", cssClass:"\"shit\""},{tag:"div", cssClass:"\"whatever\""}];
		expect(parser.getRecusivelyMatchingSections(matchDefintions).length).to.equal(0);
	});
	it("Should return multiple nested matchs if they exist", function()
	{
		parser = new linkParser( "<div class=\"blah\"><div class=\"shit\"><div class=\"whatever\">sdfsdfsfd</div></div><div class=\"whatnot\"></div><div class=\"shit\"><div class=\"whatever\"><div class=\"whatnot\"></div></div></div></div>");
		var matchDefintions = [{tag:"div", cssClass:"\"shit\""},{tag:"div", cssClass:"\"whatever\""}];
		expect(parser.getRecusivelyMatchingSections(matchDefintions).length).to.equal(2);
		expect(parser.getRecusivelyMatchingSections(matchDefintions)[0]).to.equal("<div class=\"shit\"><div class=\"whatever\">sdfsdfsfd</div></div>");
		expect(parser.getRecusivelyMatchingSections(matchDefintions)[1]).to.equal("<div class=\"shit\"><div class=\"whatever\"><div class=\"whatnot\"></div></div></div>");
	});

});

describe("getMatchingLinkSections(tag,cssClass,extraParam)",function(){
		
	 	it("Should return div on the second level with divs inside of it",
	 		function()
	 		{
	 			parser = new linkParser( "<div class=\"blah\"><div class=\"shit\"><div class=\"whatever\">sdfsdfsfd</div></div></div>");
	 			expect(parser.getMatchingLinkSections("div","\"shit\"")[0]).to.equal("<div class=\"shit\"><div class=\"whatever\">sdfsdfsfd</div></div>");

	 		}
	 		);

	 	

	 	it("Should return multiple div of different sections given they match",
	 		function()
	 		{
	 			parser = new linkParser( "<div class=\"blah\"><div class=\"shit\"><div class=\"whatever\">sdfsdfsfd</div></div></div><div class=\"superknob\"><div class=\"knob\"><div class=\"shit\"><table>blashdfsfsdfsd</table><div class=\"whatever\">sdfsdfsfd</div></div></div></div>");
	 			expect(parser.getMatchingLinkSections("div","\"shit\"").length).to.equal(2);
	 			expect(parser.getMatchingLinkSections("div","\"shit\"")[0]).to.equal("<div class=\"shit\"><div class=\"whatever\">sdfsdfsfd</div></div>");
	 			expect(parser.getMatchingLinkSections("div","\"shit\"")[1]).to.equal("<div class=\"shit\"><table>blashdfsfsdfsd</table><div class=\"whatever\">sdfsdfsfd</div></div>");
	 		}
	 		);
	 }
	);
//Change this to work with id as well
describe("getTags(tag,tagAttr,html)", function(){

		it("Should return the first div",
	 		function()
	 		{
	 			parser = new linkParser();
	 			expect(parser.getTags("div",{cssclass:"\"shit\""},"<div class=\"blah\"><div class=\"shit\"><div class=\"whatever\">sdfsdfsfd</div></div></div>")[0]).to.equal("<div class=\"shit\">");

	 		}
	 		);
		it("Should return the tag matching both class and id div",
	 		function()
	 		{
	 			parser = new linkParser();
	 			expect(parser.getTags("div",{cssclass:"\"shit\"", _id:"\"lol\""},"<div class=\"blah\"><div class=\"shit\"><div class=\"shit\" id=\"lol\"></div><div class=\"whatever\">sdfsdfsfd</div></div></div>")[0]).to.equal("<div class=\"shit\" id=\"lol\">");

	 		}
	 		);
		it("Should return the tag matching only id div",
	 		function()
	 		{
	 			parser = new linkParser();
	 			expect(parser.getTags("div",{_id:"\"lol\""},"<div class=\"blah\"><div class=\"shit\"><div class=\"shit\" id=\"lol\"></div><div class=\"whatever\">sdfsdfsfd</div></div></div>")[0]).to.equal("<div class=\"shit\" id=\"lol\">");

	 		}
	 		);
		it("Should return the tag matching only id div containing additional numbered attributs",
	 		function()
	 		{
	 			parser = new linkParser();
	 			expect(parser.getTags("div",{_id:"\"lol\""},"<div class=\"blah\"><div class=\"shit\"><div class=\"shit\" id=\"lol123\"></div><div class=\"whatever\">sdfsdfsfd</div></div></div>")[0]).to.equal("<div class=\"shit\" id=\"lol123\">");

	 		}
	 		);
		it("Should only return unique tags",
			function()
			{
				parser = new linkParser();
	 			expect(parser.getTags("div",{cssclass:"\"shit\""}, "<div class=\"blah\"><div class=\"shit\"><div class=\"whatever\">sdfsdfsfd</div></div></div><div class=\"shit\"><div class=\"whatever\">sdfsdfsfd</div></div>").length).to.equal(1);


			});
		it("Should return multiple tags when they are different", 
			function()
			{
				parser = new linkParser();
				expect(parser.getTags("div",{cssclass:"\"shit\""}, "<div class=\"blah\"><div class=\"shit\"><div class=\"whatever\">sdfsdfsfd</div></div></div><div class=\"shit\" blah=\"different\"><div class=\"whatever\">sdfsdfsfd</div></div>").length).to.equal(2);
				expect(parser.getTags("div",{cssclass:"\"shit\""}, "<div class=\"blah\"><div class=\"shit\"><div class=\"whatever\">sdfsdfsfd</div></div></div><div class=\"shit\" blah=\"different\"><div class=\"whatever\">sdfsdfsfd</div></div>")[0]).to.equal("<div class=\"shit\">");
				expect(parser.getTags("div",{cssclass:"\"shit\""},  "<div class=\"blah\"><div class=\"shit\"><div class=\"whatever\">sdfsdfsfd</div></div></div><div class=\"shit\" blah=\"different\"><div class=\"whatever\">sdfsdfsfd</div></div>")[1]).to.equal("<div class=\"shit\" blah=\"different\">");
			}
			);
		it("Should support matching of non quoted classes", function()
		{
			parser = new linkParser();
			expect(parser.getTags("div","shit","<div class=\"blah\"><div class=shit><div class=\"whatever\">sdfsdfsfd</div></div></div><div class=\"shit\" blah=\"different\"><div class=\"whatever\">sdfsdfsfd</div></div>"))
		});
}
);
describe("getMatchingBlocks(tagString, htmlBlock)", function()
{
	it("Should return a matching block that closes the current tag", function()
	{

		expect(parser.getMatchingBlocks("<div class=\"shit\">", "<div class=\"blah\"><div class=\"shit\"><div class=\"whatever\">sdfsdfsfd</div></div></div>")[0])
		.to.equal("<div class=\"shit\"><div class=\"whatever\">sdfsdfsfd</div></div>");
	});
	it("Should support html comments in nesting level", function()
	{

		expect(parser.getMatchingBlocks("<div class=\"shit\">", "<div class=\"blah\"><div class=\"shit\"><!-- --><!-- --><div class=\"whatever\">sdfsdfsfd</div></div></div>")[0])
		.to.equal("<div class=\"shit\"><!-- --><!-- --><div class=\"whatever\">sdfsdfsfd</div></div>");
	});
	it("Should support br tags", function()
	{
		expect(parser.getMatchingBlocks("<div class=\"shit\">", "<div class=\"blah\"><div class=\"shit\"><br><br/><div class=\"whatever\">sdfsdfsfd</div></div></div>")[0])
		.to.equal("<div class=\"shit\"><br><br/><div class=\"whatever\">sdfsdfsfd</div></div>");

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
describe("getJobLinkAnchors(joblinks, jobSite)", function()
{
	var joblinks = ["/stuff/Ab","/stuff/bob"];
	it("Should concatenate the links and the website into an anchor tag", function()
	{
		expect(parser.getJobLinkAnchors(joblinks,"somesite.com").length).to.equal(2);
		expect(parser.getJobLinkAnchors(joblinks,"somesite.com")[0]).to.equal("<a href='somesite.com/stuff/Ab' target='_blank'>somesite.com/stuff/Ab</a><br />");
		expect(parser.getJobLinkAnchors(joblinks,"somesite.com")[1]).to.equal("<a href='somesite.com/stuff/bob' target='_blank'>somesite.com/stuff/bob</a><br />");
	});
	it("Should still work with the \\", function()
	{
		expect(parser.getJobLinkAnchors(joblinks,"somesite.com").length).to.equal(2);
		expect(parser.getJobLinkAnchors(joblinks,"somesite.com")[0]).to.equal("<a href='somesite.com/stuff/Ab' target='_blank'>somesite.com/stuff/Ab</a><br />");
		expect(parser.getJobLinkAnchors(joblinks,"somesite.com")[1]).to.equal("<a href='somesite.com/stuff/bob' target='_blank'>somesite.com/stuff/bob</a><br />");
	});
	it("Should still work with the /", function()
	{
		expect(parser.getJobLinkAnchors(joblinks,"somesite.com").length).to.equal(2);
		expect(parser.getJobLinkAnchors(joblinks,"somesite.com")[0]).to.equal("<a href='somesite.com/stuff/Ab' target='_blank'>somesite.com/stuff/Ab</a><br />");
		expect(parser.getJobLinkAnchors(joblinks,"somesite.com")[1]).to.equal("<a href='somesite.com/stuff/bob' target='_blank'>somesite.com/stuff/bob</a><br />");
	});
	joblinks = ["/stuff/Ab\"","/stuff/bob\""];
	it("Should trim the the \" at the end", function()
	{
		expect(parser.getJobLinkAnchors(joblinks,"somesite.com").length).to.equal(2);
		expect(parser.getJobLinkAnchors(joblinks,"somesite.com")[0]).to.equal("<a href='somesite.com/stuff/Ab' target='_blank'>somesite.com/stuff/Ab</a><br />");
		expect(parser.getJobLinkAnchors(joblinks,"somesite.com")[1]).to.equal("<a href='somesite.com/stuff/bob' target='_blank'>somesite.com/stuff/bob</a><br />");

	}
		);

});
