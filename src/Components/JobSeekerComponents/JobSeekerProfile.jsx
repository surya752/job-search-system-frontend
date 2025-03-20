import { TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import JobSeekerService from '../../Service/JobSeekerService';
import JobSeekerNav from '../JobSeekerNav'
import EditSharpIcon from '@mui/icons-material/EditSharp';

function JobSeekerProfile() {
  const history = useNavigate();
  if (sessionStorage.getItem('role') !== 'JobSeeker' || sessionStorage.getItem('role') == null || sessionStorage.getItem('role') == undefined) {
    sessionStorage.setItem('role',null)
    history('/')
  }
  const [jobSeeker,setJobSeeker]=useState('')
  const [skills,setSkills]=useState([])
  
  //const {id}= useParams();
  //console.log(id);
  useEffect(()=>{getJobSeekerById();})
  const getJobSeekerById=()=>{
      JobSeekerService.getJobSeekerById(sessionStorage.getItem('id')).then((response)=>{
          setJobSeeker(response.data)
          setSkills(response.data.skillSet)
          console.log(response.data);
      }).catch(error => {
          console.log(error);
      })
  }
  // const doEdit=()=>{
  //     navigate()
  // }
  return (
    <div><JobSeekerNav/>
        <div className='container m-5'>
        <div className='row m-2'>
          <Typography className='col-2'>ID</Typography>
          <TextField className='col-2' id="outlined-basic" value={jobSeeker.jobseeker_Id} InputProps={{
            readOnly: true,
          }} variant="outlined" />
        </div>
        <div className='row m-2'>
          <Typography className='col-2' >Name</Typography>
          <TextField className='col-2' id="outlined-basic" value={jobSeeker.jobseekerName} InputProps={{
            readOnly: true,
          }} variant="outlined" />
        </div>


        <div className='row m-2'>
          <Typography className='col-2'>Address</Typography>
          <TextField className='col-2' id="outlined-basic" value={jobSeeker.address} InputProps={{
            readOnly: true,
          }} variant="outlined" />
        </div>

        <div className='row m-2'>
          <Typography className='col-2'>Contact Number</Typography>
          <TextField className='col-2' id="outlined-basic" value={jobSeeker.contactNumber} InputProps={{
            readOnly: true,
          }} variant="outlined" />
        </div>

        <div className='row m-2'>
          <Typography className='col-2'>Email</Typography>
          <TextField className='col-2' id="outlined-basic" value={jobSeeker.email} InputProps={{
            readOnly: true,
          }} variant="outlined" />
        </div>

        <div className='row m-2'>
          <Typography className='col-2'>Location Preference</Typography>
          <TextField className='col-2' id="outlined-basic" value={jobSeeker.locationPreference} InputProps={{
            readOnly: true,
          }} variant="outlined" />
        </div>

        <div className='row m-2'>
          <Typography className='col-2'>Username</Typography>
          <TextField className='col-2' id="outlined-basic" value={jobSeeker.username} InputProps={{
            readOnly: true,
          }} variant="outlined" /></div>

        <div className='row m-2'>
          <Typography className='col-2'>Password</Typography>
          <TextField className='col-2' id="outlined-basic" value={jobSeeker.password} variant="outlined" />
        </div>
    

    {/* {skills.map(skills=><Card>
      <CardContent className='row'>
        
      <Typography className='col-1 m-1' fontSize={'medium'}>
        {skills.skill}
        </Typography >
        <TextField className='col-2' id="standard-basic" variant="standard" value={skills.skillLevel} />
      </CardContent>
      </Card>)} */}


    <Link className="btn btn-success ms-5 mt-2" to={`/jobseeker/editprofile/${jobSeeker.jobseeker_Id}`} ><EditSharpIcon/> Edit</Link>
    
    </div>
    </div>
  )
}

export default JobSeekerProfile