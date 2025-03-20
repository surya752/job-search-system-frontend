import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import JobSeekerService from '../../Service/JobSeekerService'
import JobSeekerNav from '../JobSeekerNav'

function JobBasket() {
  const history = useNavigate();
  if (sessionStorage.getItem('role') !== 'JobSeeker' || sessionStorage.getItem('role') == null || sessionStorage.getItem('role') == undefined) {
    sessionStorage.setItem('role',null)
    history('/')
  }
  const [jobs, setJobs] = useState([])
  useEffect(()=>{getJobsFromBasket();},[])
  const getJobsFromBasket = () => {
    JobSeekerService.viewBasket().then(response => {
      setJobs(response.data)
      console.log(response.data);
    }).catch(error => {
      console.log(error);
    })
  }
  const applyJob=(jobid)=>{
    JobSeekerService.applyForJob(jobid,sessionStorage.getItem('id')).then(response=>{
      toast.info("Job with id "+jobid+" Applied Successfully",{position:toast.POSITION.TOP_CENTER})
      JobSeekerService.removeFromBasket(jobid);
      getJobsFromBasket();
    }).catch(error => {
      console.log(error);
  })
  }
  const removeJob=(jobid)=>{
    JobSeekerService.removeFromBasket(jobid).then(response=>{
      toast.error("Job removed from basket",{position:toast.POSITION.TOP_CENTER})
      getJobsFromBasket();
    }).catch(error => {
      console.log(error);
  })
  }
  return (
    <div><JobSeekerNav /><ToastContainer autoClose={1000}/>
      <div className='row'>
        {jobs.map(
          job =>
            <Card sx={{ minWidth: 275 }} className='col-5 m-5 '>
              <CardContent>
                <Typography variant="h5" component="div">
                  {job.title}
                </Typography>
                <Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>
                  CTC : {job.salary}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Location : {job.location}
                </Typography>
                <Typography variant="body2">
                  Skill Required :{job.skillSet}
                  <br />
                  Email : {job.email}
                </Typography>
              </CardContent>
              <CardActions>
               <Button size="small" color='success' onClick={()=>applyJob(job.id)}>Apply Job</Button>
                <Button size="small" color='error' onClick={()=>removeJob(job.id)}>Delete</Button>
              </CardActions>
            </Card>
        )
        }
      </div>
    </div>
  )
}

export default JobBasket