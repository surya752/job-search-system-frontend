import SearchIcon from '@mui/icons-material/Search';
import { Button, Card, CardActions, CardContent, FormControl, FormControlLabel, IconButton, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import EmployerService from '../../Service/EmployerService';
import JobSeekerService from '../../Service/JobSeekerService';
import EmployerNav from '../EmployerNav';
import './style.css';
function Jobs() {
  const history = useNavigate();
  if (sessionStorage.getItem('role') !== 'Employer' || sessionStorage.getItem('role') == null || sessionStorage.getItem('role') == undefined) {
    sessionStorage.setItem('role',null)
    history('/')
  }
  const [jobs,setJobs] = useState([])
  const [selection,setSelection]= useState('Search Text')
  const [text,setText]=useState('')


  useEffect(()=>{getAllJobs();},[])

  const getAllJobs=()=>{
    EmployerService.getAllJobs().then((response)=>{
      setJobs(response.data)
      console.log(response.data);
    }).catch(error => {
      console.log(error);
  })
  }

  const searchJobs=()=>{
    
    if(selection=='Skill')
    {
      JobSeekerService.searchByJobSkill(text).then((response)=>{
        setJobs(response.data)
        if(response.data.length===0)
        {
          toast.error("No Jobs with Skill : "+text)
        }
        else
        {
        toast.info("Your Search Results are here")
        console.log(response.data);
        }
      }).catch(error => {
        toast.error('Enter Search Skill')
        console.log(error);
    })
    }
    else if(selection == 'Location')
    {
      JobSeekerService.searchByJobLocation(text).then((response)=>{
        setJobs(response.data)
        if(response.data.length===0)
        {
          toast.error("No Jobs with Location : "+text)
        }
        else
        {
        toast.info("Your Search Results are here")
        console.log(response.data);
        }
      }).catch(error => {
        toast.error('Enter Search Location')
        console.log(error);
    })
    }
    else if(selection == 'Name')
    {
      JobSeekerService.searchByJobTitle(text).then((response)=>{
        setJobs(response.data)
        if(response.data.length===0)
        {
          toast.error("No Jobs with Title : "+text)
        }
        else
        {
        toast.info("Your Search Results are here")
        console.log(response.data);
        }
      }).catch(error => {
        toast.error('Enter Search Title')
        console.log(error);
    })
    }
    else
    {
      toast.warning('Select Search Type')
    }
  }

  const deleteJob=(id)=>{
    EmployerService.deleteJobById(id).then((response)=>{
      alert('Job Deleted Successfully')
      getAllJobs();
    }).catch(error => {
      console.log(error);
  })
  }

  return (
    <div > <EmployerNav/>
    <ToastContainer position="top-center"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover/>
      <div className='container-fluid row p-5 ' style={{backgroundColor:'azure'}}>
      <center>
    <FormControl>
      <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" className='pe-5'>
        <FormControlLabel value="skill" control={<Radio />} label="Skill" onClick={(e)=>setSelection('Skill')} />
        <FormControlLabel value="location" control={<Radio />} label="Location" onClick={(e)=>setSelection('Location')}/>
        <FormControlLabel value="namer" control={<Radio />} label="Title" onClick={(e)=>setSelection('Name')}/>
      </RadioGroup>
    </FormControl>
    <TextField  id="search" label={selection} variant="outlined" value={text} onChange={(e)=>setText(e.target.value)} className='pe-5'></TextField>
      <IconButton  color="primary" aria-label="add to shopping cart" className='pe-5' onClick={()=>searchJobs()}>
        <SearchIcon fontSize='large'/>
      </IconButton>
      <Button variant='outlined' color='info' onClick={()=>getAllJobs()}>Display All</Button>
      </center>
      </div>
      <div className='row' style={{backgroundColor:'azure'}}>
        {jobs.map(job => {
          if (job.company == sessionStorage.getItem('id')) {
            return (
              <Card sx={{ minWidth: 275 }} className='col-3 m-5 jcard' sx={{backgroundColor:'azure'}}>
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
              <Link className="btn btn-outline-success" to={`/employer/editjob/${job.id}`} >Edit</Link>
                <Button size="medium" variant='outlined' color='error' onClick={()=>deleteJob(job.id)} className='ms-5'>Delete</Button>
              </CardActions>
            </Card>
            );
          }
        })}
      </div>
    </div>
  )
}

export default Jobs