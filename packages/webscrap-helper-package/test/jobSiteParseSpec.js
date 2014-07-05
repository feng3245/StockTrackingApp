require("../libs/jobSiteParse.js");
fs = require("fs");
var htmldata; 
fs.readFile("./testFiles/Pickupwhatever", 'utf8', function (err, data) {
        if (err) {
            console.log('Error: ' + err);
            return;
        }
        
        htmldata = data;
        var expect = require("../.npm/node_modules/chai/chai.js").expect;

describe("getJobPosts(htmlData, fullJobLinks, jobSite)", function()
{
	it("Should return the entire job postings with title and description", function(){
		

		expect(getJobPosts(htmldata, "http://ca.indeed.com/rc/clk?jk=9becf546f004f5af", "http://ca.indeed.com")[0]).to.equal('<div class="row " id="p_9becf546f004f5af" data-jk="9becf546f004f5af" itemscope itemtype="http://schema.org/JobPosting"><h2 id=jl_9becf546f004f5af class=jobtitle><a rel="nofollow" href="http://ca.indeed.com/rc/clk?jk=9becf546f004f5af" target="_blank" itemprop="title" title="Assistant HR Manager - Manufacturing"><b>Assistant</b> <b>HR</b> Manager - Manufacturing</a></h2><span class=company itemprop="hiringOrganization" itemtype="http://schema.org/Organization"><span itemprop="name">Campbell Company of Canada</span></span> - <span itemprop="jobLocation" itemscope itemtype="http://schema.org/Place"><span class="location" itemprop="address" itemscope itemtype="http://schema.org/Postaladdress"><span itemprop="addressLocality">Toronto, ON</span></span></span><table cellpadding=0 cellspacing=0 border=0><tr><td class=snip><div><span class=summary itemprop="description">Proven knowledge of ESA legislation, successful recruitment practices and general human resource policies. Responds to all employee inquiries including policy...</span></div><span class=sdn>CPG Connect</span>&nbsp;-&nbsp;<span class=date>2 days ago</span><a href="mailto:?subject=I found this job on Indeed.com&body=http://ca.indeed.com/viewjob?jk=9becf546f004f5af" class="sl resultLink">email</a></td></tr></table></div>');

	});

});

    });

