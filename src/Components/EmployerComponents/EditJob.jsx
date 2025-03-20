import { Button, TextField, Typography } from '@mui/material';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom'
import EmployerService from '../../Service/EmployerService';
import EmployerNav from '../EmployerNav'
import ClearSharpIcon from '@mui/icons-material/ClearSharp';
import UpgradeSharpIcon from '@mui/icons-material/UpgradeSharp';

function EditJob() {
   const history = useNavigate();
   if (sessionStorage.getItem('role') !== 'Employer' || sessionStorage.getItem('role') == null || sessionStorage.getItem('role') == undefined) {
     sessionStorage.setItem('role',null)
     history('/')
   }
   const { jobid } = useParams();
   /*const [title,setTitle]=useState('');
   const [company,setCompany]=useState('');
   const [location,setLocation] = useState('');
   const [description,setDescription] = useState('');
   const [experience,setExperience]= useState('');
   const [salary,setSalary]= useState();
   const [noticePeriod,setNoticePeriod]= useState('');
   const [status,setStatus]= useState('');
   const [email,setEmail]= useState('');
   const [skillSet,setSkillSet]= useState('');
   const [contactNo,setContactNo]= useState('');*/
   const [job, setJob] = useState({ 
      title: '', 
      company: '', 
      location: '', 
      description: '', 
      experience: '', 
      salary: 0, 
      noticePeriod: '', 
      status: '', 
      email: '', 
      skillSet: '', 
      contactNo: '' 
   })

   useEffect(() => {
      if (jobid) {
         getJobById(jobid)
      }
   },[])

   const getJobById = async (jobid) => {
      let job = await (await EmployerService.getJobById(jobid)).data;
      setJob(job)
   }
   /*const updateJob = () => {
      EmployerService.editAJob(job, jobid).then((response) => {
         alert('Job Updated Successfully')
         history('/employer/jobs')
      })
         .catch(error => {
            console.log(error);
            alert('Update Failed')
         })
   }*/
   const handleChange = (e) => {
      setJob({ ...job, [e.target.placeholder]: e.target.value });
   }
   const handleSubmit = async (event) => {
      event.preventDefault();
      if (!job.title.length) {
         return;
      }
      const newItem = { ...job };
      EmployerService.editAJob(newItem, jobid);
      alert('Job Updated Successfully')
      history('/employer/jobs')
   }

   return (
      <div><EmployerNav />
         <div className="container-fuild row p-5">
            <div className='col-5 row m-2'>
               <Typography className='col-4 p-3' variant='button' fontSize={'large'} >Title :</Typography>
               <TextField placeholder='title' variant="outlined" value={job.title} onChange={handleChange} className='pe-5 col-6' />
            </div>
            <div className='col-5 row m-2'>
               <Typography className='col-4 p-3' variant='button' fontSize={'large'} >Company :</Typography>
               <TextField placeholder="company" variant="outlined" value={job.company} onChange={(e) => handleChange(e)} className='pe-5 col-6'></TextField>
            </div>
            <div className='col-5 row m-2'>
               <Typography className='col-4 p-3' variant='button' fontSize={'large'} >Location :</Typography>
               <TextField placeholder="location" variant="outlined" value={job.location} onChange={(e) => handleChange(e)} className='pe-5 col-6'></TextField>
            </div>
            <div className='col-5 row m-2'>
               <Typography className='col-4 p-3' variant='button' fontSize={'large'} >Description :</Typography>
               <TextField placeholder="description" variant="outlined" value={job.description} onChange={(e) => handleChange(e)} className='pe-5 col-6'></TextField>
            </div>
            <div className='col-5 row m-2'>
               <Typography className='col-4 p-3' variant='button' fontSize={'large'} >Experience :</Typography>
               <TextField placeholder="experience" variant="outlined" value={job.experience} onChange={(e) => handleChange(e)} className='pe-5 col-6'></TextField>
            </div>
            <div className='col-5 row m-2'>
               <Typography className='col-4 p-3' variant='button' fontSize={'large'} >Salary :</Typography>
               <TextField placeholder="salary" variant="outlined" type="number" value={job.salary} onChange={(e) => handleChange(e)} className='pe-5 col-6'></TextField>
            </div>
            <div className='col-5 row m-2'>
               <Typography className='col-4 p-3' variant='button' fontSize={'large'} >notice Period:</Typography>
               <TextField placeholder="noticePeriod" variant="outlined" value={job.noticePeriod} onChange={(e) => handleChange(e)} className='pe-5 col-6'></TextField>
            </div>
            <div className='col-5 row m-2'>
               <Typography className='col-4 p-3' variant='button' fontSize={'large'} >status :</Typography>
               <TextField placeholder="status" variant="outlined" value={job.status} onChange={(e) => handleChange(e)} className='pe-5 col-6'></TextField>
            </div>
            <div className='col-5 row m-2'>
               <Typography className='col-4 p-3' variant='button' fontSize={'large'} >email :</Typography>
               <TextField placeholder="email" variant="outlined" value={job.email} onChange={(e) => handleChange(e)} className='pe-5 col-6'></TextField>
            </div>
            <div className='col-5 row m-2'>
               <Typography className='col-4 p-3' variant='button' fontSize={'large'} >skill :</Typography>
               <TextField placeholder="skillSet" variant="outlined" value={job.skillSet} onChange={(e) => handleChange(e)} className='pe-5 col-6'></TextField>
            </div>
            <div className='col-5 row m-2'>
               <Typography className='col-4 p-3' variant='button' fontSize={'large'} >contactNo:</Typography>
               <TextField placeholder="contactNo" variant="outlined" value={job.contactNo} onChange={(e) => handleChange(e)} className='pe-5 col-6'></TextField>
            </div>
            <div className='col-5 m-2 p-3'>
               <Button variant="contained" color="success" onClick={(e) => handleSubmit(e)} className='col-4 m-3'>Update <UpgradeSharpIcon/></Button>
               <Button variant='contained' color='error' href='/employer/jobs' className='link col-4 m-3' >Cancel <ClearSharpIcon/></Button>
            </div>
         </div>
      </div>
   )
}

export default EditJob