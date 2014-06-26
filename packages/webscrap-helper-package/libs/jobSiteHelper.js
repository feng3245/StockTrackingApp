jobSiteHelper = function(title, city, province)
{
	this.jobTitle = title;
	this.jobCity = city;
	this.jobProvince = province;
}
indeedSiteHelper = jobSiteHelper;
indeedSiteHelper.prototype = {
	getJobSiteLink: function()
	{
		return "http://ca.indeed.com/jobs?q="+this.jobTitle.replace(" ","+")+"&l="+this.jobCity+"+"+this.jobProvince;
	}
};
