import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import JobSeekerService from '../../Service/JobSeekerService'
import JobSeekerNav from '../JobSeekerNav'

function AppliedJobs() {
  const history = useNavigate();
  if (sessionStorage.getItem('role') !== 'JobSeeker' || sessionStorage.getItem('role') == null || sessionStorage.getItem('role') == undefined) {
    sessionStorage.setItem('role',null)
    history('/')
  }
  const[jobs,setJobs]=useState([])

  useEffect(()=>{getAppliedJobs();},[])

  const getAppliedJobs=()=>{
    JobSeekerService.getAllAppliedJobs(sessionStorage.getItem('id')).then(response=>{
      setJobs(response.data)
      console.log(response.data);
    }).catch(error => {
      console.log(error);
  })
  }
  return (
    <div><JobSeekerNav/>
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
               {/*  <CardActions>
                  <Button size="small" color='error'>Remove</Button>
                </CardActions>*/}
              </Card>
        )
        }
      </div>

    </div>
  )
}

export default AppliedJobs