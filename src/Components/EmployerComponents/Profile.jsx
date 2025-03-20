import { TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import EmployerService from '../../Service/EmployerService';
import EmployerNav from '../EmployerNav'

function Profile() {
  const history = useNavigate();
  if (sessionStorage.getItem('role') !== 'Employer' || sessionStorage.getItem('role') == null || sessionStorage.getItem('role') == undefined) {
    sessionStorage.setItem('role',null)
    history('/')
  }
  const[employer, setEmployer]=useState('')
  useEffect(()=>getEmployerById())
  const getEmployerById=()=>{
      EmployerService.getEmployerById(sessionStorage.getItem('employerId')).then((response)=>{
          setEmployer(response.data)
          console.log(response.data);
      }).catch(error => {
          console.log(error);
      })
  }
  return (
    <div><EmployerNav/>
        <div>
        <br/>
        <div><h1>{employer.organizationName}'s Profile</h1></div>
        
        <br/>
        <div className='container m-5'>
        <div className='row m-2'>
        <Typography className='col-2'>Organization Name</Typography>
         <TextField className='col-2' id="outlined-basic" value={employer.organizationName} InputProps={{
            readOnly: true,
          }} variant="outlined" />
          </div>

          <div className='row m-2'>
        <Typography className='col-2'>Address</Typography>
        <TextField className='col-2' id="outlined-basic" value={employer.address} InputProps={{
            readOnly: true,
          }} variant="outlined" /></div>

<div className='row m-2'>
        <Typography className='col-2'>Contact Number</Typography>
        <TextField className='col-2' id="outlined-basic" value={employer.contactNumber} InputProps={{
            readOnly: true,
          }} variant="outlined" /></div>


<div className='row m-2'>
        <Typography className='col-2'>Email</Typography>
        <TextField className='col-2' id="outlined-basic" value={employer.email} InputProps={{
            readOnly: true,
          }} variant="outlined" /></div>
<div className='row m-2'>
        <Typography className='col-2'>Username</Typography>
        <TextField className='col-2' id="outlined-basic" value={employer.username} InputProps={{
            readOnly: true,
          }} variant="outlined" /></div>

<div className='row m-2'>
        <Typography className='col-2'>Password</Typography>
        <TextField className='col-2' id="outlined-basic" value={employer.password} InputProps={{
            readOnly: true,
          }} variant="outlined" /></div>

</div>
          <Link className="btn btn-success" to={`/employer/editprofile/${employer.id}`} >Edit</Link>  
    </div>
    </div>
  )
}

export default Profile