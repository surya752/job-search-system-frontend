import React, { useState } from 'react';
import EmployerNav from '../EmployerNav';
import EmployerService from '../../Service/EmployerService';
import { Button } from 'react-bootstrap';
import { FormControl, FormControlLabel, Stack, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
//import { useNavigate } from 'react-router-dom';



const PostJob = (props) => {
  const history = useNavigate();
  if (sessionStorage.getItem('role') !== 'Employer' || sessionStorage.getItem('role') == null || sessionStorage.getItem('role') == undefined) {
    sessionStorage.setItem('role',null)
    history('/')
  }
  const [employerId, setEmployerId] = useState('');
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [noticePeriod, setNoticePeriod] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [experience, setExperience] = useState('');
  const [salary, setSalary] = useState('');
  const [status, setStatus] = useState('');
  const [email, setEmail] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [skillset, setSkillset] = useState('');
 const [mailError, setMailError] = useState('');
 const [contactError, setContactError] = useState('');
 const [nameError,setNameError]=useState('');
 const [locationError,setLocationError]=useState('');
 const [descriptionError,setDescriptionError]=useState('');
 const [experienceError,setExperienceError]=useState('');
 
 const [salaryError,setSalaryError]=useState('');
 const [noticeError,setNoticeError]=useState('');
 const [skillsetError,setSkillsetError]=useState('');
 const [statusError,setStatusError]=useState('');
 const [titleError,setTitleError]=useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log(email);
}

const post= (e)=>{
  e.preventDefault();
     console.log("here");
      alert(title);
      const job = {
          title:title,
          company:company,
          location:location,
          description:description,
          experience:experience,
          salary:salary,
          noticePeriod:noticePeriod,
          status:status,
          email:email,
          skillSet:skillset,
          contactNo:contactNo
          
         
         
      };
      console.log(job);
      
      EmployerService.postAJob(job,employerId).then(response =>{
        const {data} = response;
        alert("Job has been posted",data.name);
        history("/employer/jobs")   
      })
    }
    function isValidFields(name){
      return /^[A-Za-z][A-Za-z0-9_]{7,29}$/.test(name);
     }
     function isValidEmail(email) {
      return /\S+@\S+\.\S+/.test(email);
    }
    
    function isValidContact(contact_number) {
      return /^\d{3}-\d{3}-\d{4}$/.test(contact_number);
    }
    
    const handleChange = event => {
      if (!isValidEmail(event.target.value)) {
        setMailError('This is not a valid email format!');
      } else {
        setMailError(null);
      }
      setEmail(event.target.value);
      
    };
    const handleContact=event=>{
      if (!isValidContact(event.target.value)) {
        setContactError('Please enter the contact in (123-456-7890) format');
      } else {
        setContactError(null);
      }
      setContactNo(event.target.value)
    }
    const handleFieldName=event=>{
      
      if(!isValidFields(event.target.value)&& event.target.value.length<=4){
        
        setNameError('Please enter valid company name');
      }
      else{
        setNameError(null);
      }
    
      setCompany(event.target.value);
    }
    const handleFieldTitle=event=>{
      
      if(!isValidFields(event.target.value)&& event.target.value.length<=4){
        
        setTitleError('Please enter valid job title');
      }
      else{
        setTitleError(null);
      }
    
      setTitle(event.target.value);
    }
    const handleFieldLocation=event=>{
      
      if(!isValidFields(event.target.value)&& event.target.value.length<=4){
        
        setLocationError('Please enter valid job location');
      }
      else{
        setLocationError(null);
      }
    
      setLocation(event.target.value);
    }
    const handleFieldDesciption=event=>{
      
      if(!isValidFields(event.target.value)&& event.target.value.length<=4){
        
        setDescriptionError('Please enter company description');
      }
      else{
        setDescriptionError(null);
      }
    
      setDescription(event.target.value);
    }
    const handleFieldExperience=event=>{
      
      if(!isValidFields(event.target.value)&& event.target.value.length<=4){
        
        setExperienceError('Please enter work experience');
      }
      else{
        setExperienceError(null);
      }
    
      setExperience(event.target.value);
    }
    const handleFieldNotice=event=>{
      
      if(!isValidFields(event.target.value)&& event.target.value.length<1){
        
        setNoticeError('Please enter notice period');
      }
      else{
        setNoticeError(null);
      }
    
      setNoticePeriod(event.target.value);
    }
    const handleFieldStatus=event=>{
      
      if(!isValidFields(event.target.value)&& event.target.value.length<=4){
        
        setStatusError('Please enter job status');
      }
      else{
        setStatusError(null);
      }
    
      setStatus(event.target.value);
    }
    const handleFieldSkillset=event=>{
      
      if(!isValidFields(event.target.value)&& event.target.value.length<3){
        
        setSkillsetError('Please enter skillset required for job');
      }
      else{
        setSkillsetError(null);
      }
    
      setSkillset(event.target.value);
    }

    const handleFieldSalary=event=>{
      
      if(event.target.value.length<2){
        
        setSalaryError('Please enter salary');
      }
      else{
        setSalaryError(null);
      }
    
      setSalary(event.target.value);
    }

  return (
    <div><EmployerNav/>
     <h2 align="center">Post Job Details</h2>
    <div   align='center'>
     <FormControl  className='m-4'>
        <TextField  label="Employer Id:" value={employerId} onChange={(e) => setEmployerId(e.target.value)} type="text" className="form-control" name="employerId" id="employerId" placeholder="employer_id" />
            <br/><TextField label="Job Title" value={title} onChange={handleFieldTitle} className="form-control" type="text" name="title" id="title" placeholder="title" />
            {titleError && <h6 style={{color: 'red'}}>{titleError}</h6>}
           <br/> <TextField label="Company Name" value={company} onChange={handleFieldName} className="form-control" type="text" name="company" id="company" placeholder="company" />
            {nameError && <h6 style={{color: 'red'}}>{nameError}</h6>}
            <br/>
            <TextField label=" Location" value={location} onChange={handleFieldLocation}className="form-control" type="text" placeholder="location" id="location" name="address" />
            {locationError && <h6 style={{color: 'red'}}>{locationError}</h6>}
            <br/>
            <TextField label="Description" value={description} onChange={handleFieldDesciption} className="form-control" type="text" placeholder="description" id="description" name="description" />
            {descriptionError && <h6 style={{color: 'red'}}>{descriptionError}</h6>}
            <br />
            <TextField label="Experience" value={experience} onChange={handleFieldExperience} className="form-control" type="text" placeholder="experience" id="experience" name="experience" />
            {experienceError && <h6 style={{color: 'red'}}>{experienceError}</h6>}
            <br />
            <TextField label="Salary" value={salary} onChange={handleFieldSalary}  className="form-control" type="number" placeholder="salary" id="salary" name="salary" />
            {salaryError && <h6 style={{color: 'red'}}>{salaryError}</h6>}
             <br/>
            <TextField label="Notice Period" value={noticePeriod} onChange={handleFieldNotice}  className="form-control" type="text" name="noticePeriod" id="noticePeriod" placeholder="noticePeriod"/> 
            
            {noticeError && <h6 style={{color: 'red'}}>{noticeError}</h6>}<br/>
            
            <TextField label="Status" value={status} onChange={handleFieldStatus} className="form-control" type="text" placeholder="status" id="status" name="status" />
            {statusError && <h6 style={{color: 'red'}}>{statusError}</h6>}
            <br/>
            
            <TextField label="Email" value={email} onChange={handleChange} className="form-control" type="email" placeholder="your_email@gmail.com" id="email" name="email" />
            {mailError && <h6 style={{color: 'red'}}>{mailError}</h6>}
                             
            <br/>
            <TextField label="Skillset" value={skillset} onChange={handleFieldSkillset} className="form-control" type="text" placeholder="skillset" id="skillset" name="skillset" />
            {skillsetError && <h6 style={{color: 'red'}}>{skillsetError}</h6>}
            <br/>
            <TextField label="Contact_No" value={contactNo} onChange={handleContact} className="form-control" type="text" placeholder="contactNo" id="contactNo" name="contactNo"  />
            {contactError && <h6 style={{color: 'red'}}>{contactError}</h6>}
            
            <br/>
            
            <Button variant="outline-success" onClick={post} >Post</Button> 
            
  </FormControl>
  </div>
    </div>
  )
}

export default PostJob