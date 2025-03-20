import React, { useEffect, useState } from 'react';
import JobSeekerService from '../../Service/JobSeekerService';
import JobSeekerNav from '../JobSeekerNav';
import './style.css';
import { Link, useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, FormControl, FormControlLabel, IconButton, Radio, RadioGroup, StepContext, TextField } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { toast, ToastContainer } from 'react-toastify';



function ViewJobs() {
  const history = useNavigate();
  if (sessionStorage.getItem('role') !== 'JobSeeker' || sessionStorage.getItem('role') == null || sessionStorage.getItem('role') == undefined) {
    sessionStorage.setItem('role',null)
    history('/')
  }
  const [jobs,setJobs]=useState([])
  const [selection,setSelection]=useState('');
  const [text,setText]=useState('');

  useEffect(()=>{getAllJobs();},[])

  const getAllJobs=()=>{
    JobSeekerService.getJobs().then(response=>{
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
        console.log(error);
    })
    }
    else
    {
      toast.warning('Select Search Type')
    }
  }
  const addToBasket=(id)=>{
    JobSeekerService.addToBasket(id).then(response=>
      {
        toast.success("Job added to Basket")
        getAllJobs();
      }).catch(error => {
        console.log(error);
    })
  }
  const applyJob=(jobid)=>{
    JobSeekerService.applyForJob(jobid,sessionStorage.getItem('id')).then(response=>{
      toast.info("Job with id "+jobid+" Applied Successfully")
    }).catch(error => {
      console.log(error);
  })
  }
  return (
    <div><JobSeekerNav/><ToastContainer position='top-center' autoClose={1000}/>
    <div className='container-fluid pt-5'><center>
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
    <div className='row'>
        {jobs.map(
          job => {if(job.favourite === false) {
            return (
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
                    <IconButton  color="primary" aria-label="add to shopping cart"  onClick={() => addToBasket(job.id)} >
                    <AddShoppingCartIcon />
                  </IconButton>
                </CardActions>
              </Card>
            );
          }}
        )
        }
      </div>
      
    </div>
  )
}

export default ViewJobs