require("../libs/jobSiteHelper.js");
var expect = require("../.npm/node_modules/chai/chai.js").expect;
describe("getJobSiteLink()", function()
{
	var indeedHelper = new indeedSiteHelper("hr assistant", "Toronto", "Ontario");
	it("Should return a proper link similar to one indeed generates", function()
		{
			expect(indeedHelper.getJobSiteLink()).to.equal("http://ca.indeed.com/jobs?q=hr+assistant&l=Toronto+Ontario");
		});

});

