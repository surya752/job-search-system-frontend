import axios from 'axios'


const EMPLOYER_URL = 'http://localhost:9090/api/v2';

class EmployerService {

	createEmployee(employee) {
		return axios.post(EMPLOYER_URL + '/employers', employee)
	}

	postAJob(job, id) {
		return axios.post(EMPLOYER_URL + '/employers/'+id+'/job', job)
	}

	getAllJobs() {
		return axios.get(EMPLOYER_URL + '/job')
	}

	getJobById(jobId) {
		return axios.get(EMPLOYER_URL + '/jobs/' + jobId)
	}

	deleteJobById(jobId) {
		return axios.delete(EMPLOYER_URL + '/jobs/' + jobId)
	}

	searchJobSeekerBySkills(skill) {
		return axios.get(EMPLOYER_URL + '/jobseekers/skills/' + skill)
	}

	editAJob(job, id) {
		return axios.put(EMPLOYER_URL + '/jobs/' + id, job)
	}

	searchJobSeekerByJobId(jobId) {
		return axios.get(EMPLOYER_URL + '/jobseeker/job/' + jobId)
	}
	
	getEmployerByOrganization(organizationName) {
		return axios.get(EMPLOYER_URL + '/employers/organizations' + organizationName)
	}

	getAllEmployers() {
		return axios.get(EMPLOYER_URL + '/employers');
	}
	getAllJobSeeker() {
		return axios.get(EMPLOYER_URL + '/jobseekers');
	}
	updateEmployer(employerId,newEmployer)
	{
		return axios.put(EMPLOYER_URL+'/employer/update/'+employerId,newEmployer)
	}
	getEmployerById(id){
		return axios.get(EMPLOYER_URL+'/employers/'+id)
	}

}

export default new EmployerService();