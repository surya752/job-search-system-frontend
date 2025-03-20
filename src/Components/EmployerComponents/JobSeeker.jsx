import { Button, Card, CardContent, FormControl, FormControlLabel, IconButton, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import EmployerService from '../../Service/EmployerService'
import EmployerNav from '../EmployerNav'
import SearchIcon from '@mui/icons-material/Search';
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function JobSeeker() {
  const history = useNavigate();
  if (sessionStorage.getItem('role') !== 'Employer' || sessionStorage.getItem('role') == null || sessionStorage.getItem('role') == undefined) {
    sessionStorage.setItem('role',null)
    history('/')
  }
    const [jobSeekers,setJobSeekers]=useState([])
    const [selection,setSelection]= useState('Search Text')
    const [text,setText]=useState('')

    useEffect(()=>{getAllJobSeeker();},[])
    const getAllJobSeeker=()=>{
        EmployerService.getAllJobSeeker().then((response)=>{
            setJobSeekers(response.data)
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        })
    }
    const searchJobSeeker = ()=>{
      if(selection=='Skill')
      {
        EmployerService.searchJobSeekerBySkills(text).then(response=>{
          setJobSeekers(response.data)
          if (response.data.length === 0) {
            toast.error("No Job Seeker with Skill : " + text,{position:toast.POSITION.TOP_CENTER})
          }
          else {
            toast.info("Your Search Results",{position:toast.POSITION.TOP_CENTER})
            console.log(response.data);
          }
      }).catch(error => {
        toast.error('Enter Search Skill',{position:toast.POSITION.TOP_CENTER})
          console.log(error);
      })
      }
      else if(selection=='JobId')
      {
        EmployerService.searchJobSeekerByJobId(text).then(response=>{
          setJobSeekers(response.data)
          if (response.data.length === 0) {
            toast.error("No Job Seeker with Job Id : " + text,{position:toast.POSITION.TOP_CENTER})
          }
          else {
            toast.info("Your Search Results",{position:toast.POSITION.TOP_CENTER})
            console.log(response.data);
          }
      }).catch(error => {
          toast.error('Enter Search Job Id',{position:toast.POSITION.TOP_CENTER})
          console.log(error);
      })
      }
      else
      {
        toast.warning('Select Search Type',{position:toast.POSITION.TOP_CENTER})
      }
    }
  return (
    <div>
        <EmployerNav/><ToastContainer autoClose={1000}/>
    <div className='container-fluid'>
    <div className='container-fluid row p-5 '>
      <center>
    <FormControl>
      <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" className='pe-5'>
        <FormControlLabel value="skill" control={<Radio />} label="Skill" onClick={(e)=>setSelection('Skill')} />
        <FormControlLabel value="jobId" control={<Radio />} label="Job Id" onClick={(e)=>setSelection('JobId')}/>
      </RadioGroup>
    </FormControl>
    <TextField  id="search" label={selection} variant="outlined" value={text} onChange={(e)=>setText(e.target.value)} className='pe-5'></TextField>
      <IconButton  color="primary" aria-label="add to shopping cart" className='pe-5' onClick={()=>searchJobSeeker()} >
        <SearchIcon fontSize='large'/>
      </IconButton>
      <Button variant='outlined' color='info' onClick={()=>getAllJobSeeker()}>Display All</Button>
      </center>
      </div>
    <div className='row'>
        {jobSeekers.map(
          jobSeeker => 
              <Card sx={{ minWidth: 275 }} className='col-5 m-5 card '>
                <CardContent>
                <Typography variant="h5" component="div">
                  {jobSeeker.jobseekerName}
                  </Typography>
                  <Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>
                  Email : {jobSeeker.email}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Contact No : {jobSeeker.contactNumber}
                  </Typography>
                  <Typography variant="body2">
                  Address : {jobSeeker.address}
                    <br />
                    Location Preference : {jobSeeker.locationPreference}
                  </Typography>
                </CardContent>
              </Card>
        )
        }
      </div>
    </div>
    </div>
  )
}

export default JobSeeker