require("../libs/jobSiteParse.js");
fs = require("fs");
var htmldata; 
var expect = null;
fs.readFile("./testFiles/Pickupwhatever", 'utf8', function (err, data) {
        if (err) {
            console.log('Error: ' + err);
            return;
        }
        console.log(err);        
        htmldata = data;
         expect = require("../.npm/node_modules/chai/chai.js").expect;

describe("getJobPosts(htmlData, fullJobLinks, jobSite)", function()
{
	it("Should return the entire job postings with title and description", function(){
		

		expect(getJobPosts(htmldata, "http://ca.indeed.com/rc/clk?jk=9becf546f004f5af", "http://ca.indeed.com")[0]).to.equal('<div itemtype=\"http://schema.org/JobPosting\" itemscope=\"\" data-jk=\"9becf546f004f5af\" id=\"p_9becf546f004f5af\" class=\"row \"><h2 class=\"jobtitle\" id=\"jl_9becf546f004f5af\"><a href=\"http://indeed.ca/rc/clk?jk=9becf546f004f5af\"><b>Assistant</b><b>HR</b> Manager - Manufacturing</a></h2><span itemtype=\"http://schema.org/Organization\" itemprop=\"hiringOrganization\" class=\"company\"><span itemprop=\"name\">Campbell Company of Canada</span></span>-<span itemtype=\"http://schema.org/Place\" itemscope=\"\" itemprop=\"jobLocation\"><span itemtype=\"http://schema.org/Postaladdress\" itemscope=\"\" itemprop=\"address\" class=\"location\"><span itemprop=\"addressLocality\">Toronto, ON</span></span></span><table border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tbody><tr><td class=\"snip\"><div><span itemprop=\"description\" class=\"summary\">Proven knowledge of ESA legislation, successful recruitment practices and general human resource policies. Responds to all employee inquiries including policy...</span></div><span class=\"sdn\">CPG Connect</span>&nbsp;-&nbsp;<span class=\"date\">2 days ago</span><span class=\"tt_set\" id=\"tt_set_0\">-<span id=\"addedit2_9becf546f004f5af\"></span><div style=\"display:none;\" class=\"edit_note_content\" id=\"editsaved2_9becf546f004f5af\"></div><a class=\"sl resultLink\" href=\"mailto:?subject=I found this job on Indeed.com&amp;body=http://ca.indeed.com/viewjob?jk=9becf546f004f5af\">email</a>-</span><div class=\"tt_display\" id=\"tt_display_0\"><div style=\"display:none;\" class=\"ws_content save_job_content\" id=\"anon_save_job0\"></div><div style=\"display:none;\" class=\"ws_content block_job_content\" id=\"block_job0\"></div><div style=\"display:none;\" class=\"ws_content email_job_content\" id=\"email_job_content_0\"></div><div class=\"more_actions\" id=\"more_0\"><ul><li><span class=\"mat\">View all<a rel=\"nofollow\" href=\"http://indeed.ca/Campbell-Company-of-Canada-jobs\">Campbell Company of Canada jobs</a>-<a href=\"http://indeed.ca/jobs-in-Toronto,-ON\">Toronto jobs</a></span></li></ul><div id=\"options_0\"></div></div></div></td></tr></tbody></table></div>');

	});

});

    });
function more(str1, str2)
{

    
}
describe("more(str1,str2)", function()
{
    it("Should return what str1 have that str2 dont", function(){

        expect(more("<a></a>sdf<b></b><c></c>","<a></a>sdf<c></c>")).to.equal("<b></b>");
    });

});

