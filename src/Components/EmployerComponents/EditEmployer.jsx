import {  TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '@mui/material/Button'
import EmployerService from '../../Service/EmployerService'
import EmployerNav from '../EmployerNav'

function EditEmployer() {
    const history = useNavigate();
    if (sessionStorage.getItem('role') !== 'Employer' || sessionStorage.getItem('role') == null || sessionStorage.getItem('role') == undefined) {
      sessionStorage.setItem('role',null)
      history('/')
    }
    const {id}= useParams()
    const [employer, setEmployer]= useState({
        organizationName: '',
        address: '',
        contactNumber: '',
        email: '',
        username: '',
        password: ''
    },[])
    const updateEmployer= async (id)=>{
        let employer=await(await EmployerService.getEmployerById(id)).data;
        setEmployer(employer)

        console.log(employer);
    }
    useEffect(()=>{
        if(id){
            updateEmployer(id)
        }
    },[])
    const handleChange=(event)=>{
        setEmployer({...employer, [event.target.placeholder]:event.target.value})
    }
    const handleSubmit= async (event) => {
        event.preventDefault();
        if(!employer.organizationName.length){
            return;
        }
        const newItem={...employer};
        EmployerService.updateEmployer(id,newItem);
        history('/employer/profile')
    } 
  return (
    <div><EmployerNav/>
        <br/>
        <h2>Update Profile</h2><br/>
    <form  onSubmit={handleSubmit}>
        <TextField placeholder='organizationName' label="Name"
                      onChange={handleChange}
              value={employer.organizationName}
            /><br/><br/>
        
        <TextField placeholder='address' label="Address"
                      onChange={handleChange}
              value={employer.address}
            /><br/><br/>


        <TextField placeholder='contactNumber' label="contactNumber"
                      onChange={handleChange}
              value={employer.contactNumber}
            /><br/><br/>

        <TextField placeholder='email' label="Email"
                      onChange={handleChange}
              value={employer.email}
            /><br/><br/>

        <TextField placeholder='username' label="Username"
                      onChange={handleChange}
              value={employer.username}
            /><br/><br/>

        <TextField placeholder='password' label="Password"
                      onChange={handleChange}
              value={employer.password}
            /><br/><br/>
        

        <Button variant="contained" color="success"  onClick={handleSubmit}>Update</Button>
        <Button variant="outlined" color="error" href='/employer/profile'>Cancel</Button>

    </form>

    </div>
  )
}

export default EditEmployer