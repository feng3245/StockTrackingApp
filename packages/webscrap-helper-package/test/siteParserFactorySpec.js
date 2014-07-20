require("../libs/siteParserFactory.js");
var expect = require("../.npm/node_modules/chai/chai.js").expect;
var siteParserFac = new siteParserFactory();

describe("getParserFromSiteLink(sitelink)", function()
{
	
	it("Should return a indeedparser when indeed.ca is passed in", function()
		{
			expect(siteParserFac.getParserFromSiteLink("indeed.ca").ParseFilterData()[0].tag).to.equal("a");
			expect(siteParserFac.getParserFromSiteLink("indeed.ca").ParseFilterData()[0]._id).to.equal("tog");
			expect(siteParserFac.getParserFromSiteLink("indeed.ca").ParseFilterData()[1].tag).to.equal("span");
			expect(siteParserFac.getParserFromSiteLink("indeed.ca").ParseFilterData()[1]._id).to.equal("savelink");
			expect(siteParserFac.getParserFromSiteLink("indeed.ca").ParseFilterData()[2].tag).to.equal("span");
			expect(siteParserFac.getParserFromSiteLink("indeed.ca").ParseFilterData()[2]._id).to.equal("block");
			

		});
	it("Should return a standard parse when anything else is passed in", function()
		{
			expect(siteParserFac.getParserFromSiteLink("blingbling.ca").ParseFilterData()[0]).to.equal(undefined);
		});

});
