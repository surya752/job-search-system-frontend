import { Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import JobSeekerService from '../../Service/JobSeekerService';
import JobSeekerNav from '../JobSeekerNav';
import ClearSharpIcon from '@mui/icons-material/ClearSharp';
import UpgradeSharpIcon from '@mui/icons-material/UpgradeSharp';


export default function EditProfile(){
  const history = useNavigate();
  if (sessionStorage.getItem('role') !== 'JobSeeker' || sessionStorage.getItem('role') == null || sessionStorage.getItem('role') == undefined) {
    sessionStorage.setItem('role',null)
    history('/')
  }
    const {id} = useParams()
    // const [jobSeekerName, setJobSeekerName]=useState('');
    // const[address, setAddress]=useState('')
    // const[contactNumber, setContactNumber]=useState('')
    // const[email, setEmail]=useState('')
    // const[locationPreference, setLocationPreference]=useState('')
    // const[username,setUserName]=useState('')
    // const[password, setPassword]=useState('')
    const [skillSets,setSkillSets]=useState([])
    const [jobSeeker, setJobseeker]=useState({
        
            
            jobseekerName: '',
            address: '',
            contactNumber: '',
            email: '',
            locationPreference: '',
            username: '',
            password: ''
    })
    const updateJobSeekeer=async(id)=>{
        let jobSeeker=await (await JobSeekerService.getJobSeekerById(id)).data;
        //console.log(jobSeeker);
        setJobseeker(jobSeeker)
        setSkillSets(jobSeeker.skillSet)
    }
    //const [job,setJob]=useState('');

    //useEffect(()=>{getJobSeekerById();})
    useEffect(()=>{
        if(id){
            updateJobSeekeer(id)
        }
    },[])

    // const getJobSeekerById=()=>{
    //     JobSeekerService.getJobSeekerById(id).then((response)=>{
    //         setJobSeekerName(response.data.jobseekerName)
    //         setAddress(response.data.address)
    //         setContactNumber(response.data.contactNumber)
    //         setEmail(response.data.email)
    //         setLocationPreference(response.data.locationPreference)
    //         setUserName(response.data.username)
    //         setPassword(response.data.password)
           
    //         //console.log(response.data); 
    //     }).catch(error=>{
    //         console.log(error);
    //     })
    // }
    // const updateJobSeeker=()=>{
    //     const jobSeeker={jobSeekerName,address,contactNumber,email,
    //         locationPreference,username,password}
    //         JobSeekerService.updateJobSeeker(id,jobSeeker).then((response)=>{
    //             alert('Job Seeker updated successfully')
    //             history("/")
    //         }).catch(error=>{
    //             console.log(error);
    //             alert('Update Failed')

    //         })
    // }
    const handleChange=(event)=>{
       setJobseeker({...jobSeeker,[event.target.placeholder]:event.target.value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!jobSeeker.jobseekerName.length) {
          return;
        }
        const newItem = {...jobSeeker};
       
          JobSeekerService.updateJobSeeker(id,newItem);
        //setJobseeker(getJobSeekerById(id));
        alert('Profile Updated')
        history('/jobseeker/profile')
        
        
      }

    return(<div><JobSeekerNav/>
        <div className='container m-4'>
            <h2>Update Profile</h2><br/>
            <form onSubmit={handleSubmit}>
          
            <TextField placeholder='jobseekerName' label="Name"
              onChange={handleChange}
              value={jobSeeker.jobseekerName}
            /><br/><br/>



           <TextField placeholder='email' label="Email"
              onChange={handleChange}
              value={jobSeeker.email}
            /><br/><br/>


              <TextField placeholder='contactNumber' label="Contact Number"
              onChange={handleChange}
              value={jobSeeker.contactNumber}
            /><br/><br/>


              <TextField placeholder='address' label="Address"
              onChange={handleChange}
              value={jobSeeker.address}
            /><br/><br/>


            <TextField placeholder='locationPreference' label="Location Preference"
              onChange={handleChange}
              value={jobSeeker.locationPreference}
            /><br/><br/>



            <TextField placeholder='username' label="Username"
              onChange={handleChange}
              value={jobSeeker.username}
            /><br/><br/>


            
            <TextField placeholder='password' label="Password"
              onChange={handleChange}
              value={jobSeeker.password}
            /><br/><br/>
            <Button variant="contained" color="success"  onClick={handleSubmit}><UpgradeSharpIcon/>Update</Button>
            <Button variant="contained" color="error" href='/jobseeker/profile' className='ms-3 link'><ClearSharpIcon/>Cancel</Button>
            &nbsp;&nbsp;
            
          </form><br/><br/>
        </div>
        </div>
    );
}