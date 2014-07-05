require("../libs/siteParserFactory.js");
var expect = require("../.npm/node_modules/chai/chai.js").expect;
var siteParserFac = new siteParserFactory();

describe("getParserFromSiteLink(sitelink)", function()
{
	
	it("Should return a indeedparser when indeed.ca is passed in", function()
		{
			expect(siteParserFac.getParserFromSiteLink("indeed.ca").ParseFilterData()[0]).to.equal("something");

		});
	it("Should return a standard parse when anything else is passed in", function()
		{
			expect(siteParserFac.getParserFromSiteLink("blingbling.ca").ParseFilterData()[0]).to.equal(undefined);
		});

});
