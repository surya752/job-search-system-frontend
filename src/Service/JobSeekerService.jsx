import axios from "axios";
const JobSeeker_URL='http://localhost:9090/api/v1';

class JobSeekerService
{
    getJobs()
    {
        return axios.get(JobSeeker_URL+'/jobs')
    }
    getJobSeekerById(id)
    {
        return axios.get(JobSeeker_URL+'/jobseekers/'+id)
    }

	registerJobSeeker(jobSeeker)
	{
		return axios.post(JobSeeker_URL+'/jobseekers',jobSeeker)
	}

	applyForJob(jobId,jobSeekerId )
	{
		return axios.post(JobSeeker_URL+'/applyjobs/'+jobId+'/'+jobSeekerId)
	}

	addToBasket(jobId)
	{
		return axios.put(JobSeeker_URL+'/baskets/'+jobId)
	}

	updateJobSeeker(jobSeekerId,newJobSeeker)
	{
		return axios.put(JobSeeker_URL+'/'+jobSeekerId,newJobSeeker)
	}

	removeFromBasket(jobId)
	{
		return axios.delete(JobSeeker_URL+'/baskets/'+jobId)
	}

	viewBasket()
	{
		return axios.get(JobSeeker_URL+'/baskets')
	}

	searchByJobLocation(location)
	{
		return axios.get(JobSeeker_URL+'/locations/'+location)
	}
	
	searchByJobSkill(skill)
	{
		return axios.get(JobSeeker_URL+'/skills/'+skill)
	}
	
	searchByJobTitle(title)
	{
		return axios.get(JobSeeker_URL+'/titles/'+title)
	}
	
	
	searchByJobId(jobId) {
		return axios.get(JobSeeker_URL+'/jobs/'+jobId)
	}
	
	
	getAllAppliedJobs(jobSeekerId)
	{
		return axios.get(JobSeeker_URL+'/appliedjobs/'+jobSeekerId)
	}
}
export default new JobSeekerService();