import { Button, FormControl, Input, InputLabel, TextField } from "@mui/material";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
//import { Formik } from 'formik';
import EmployerService from "../Service/EmployerService";
import Navbar from "./NavBar";




export const RegisterEmployer = (props) => {
    const [organizationName, setOrganizationName] = useState('');
    const [address, setAddress] = useState('');
    const [contact_number, setContactNumber] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [mailError, setMailError] = useState('');
    const [contactError, setContactError] = useState('');
    const [fieldError,setFieldError]=useState('');
    const [addressError,setAddressError]=useState('');
    const [userError,setUserError]=useState('');
    const [passError,setPassError]=useState('');

  
    
   const onSignup = (e)=>{
    e.preventDefault();
        console.log("here");
        alert(organizationName);
        const user = {
            organizationName :organizationName,
            address :address,
            contactNumber:contact_number,
            email:email,
            username:username,
            password: password
        };
       
        console.log(user);
        alert(user.name," Hello");
       
        EmployerService.createEmployee(user).then(response =>{
          const {data} = response;
          alert("Hello registering of the new account is successful",data.name);
          props.history.post("/logIn");
        }).catch(error=>{
            //alert("error",error);
          });  
        
    }

    
    

   function isValidFields(name){
    return /^[A-Za-z][A-Za-z0-9_]{7,29}$/.test(name);
   }

   const handleFieldName=event=>{
      
        if(!isValidFields(event.target.value)&& event.target.value.length<=4){
          
          setFieldError('Please enter valid name with atleast 5 characters');
        }
        else{
          setFieldError(null);
        }
      
        setOrganizationName(event.target.value);
      }

      const handleFieldAddress=event=>{
      
        if(!isValidFields(event.target.value)&& event.target.value.length<=4){
          
          setAddressError('Please enter valid address ');
        }
        else{
          setAddressError(null);
        }
      
        setAddress(event.target.value);
      }

      const handleFieldUser=event=>{
      
        if(!isValidFields(event.target.value)&& event.target.value.length<=4){
        
          setUserError('Please enter valid username');
        }
        else{
          setUserError(null);
        }
      
        setUsername(event.target.value);
      }

      const handleFieldPass=event=>{
      
        if(!isValidFields(event.target.value)&& event.target.value.length<8){
          
          setPassError('Please enter password with length>=8');
        }
        else{
          setPassError(null);
        }
      
        setPassword(event.target.value);
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
      setContactNumber(event.target.value)
    }
   
    
    return (
        <div><Navbar/>
        <ToastContainer newestOnTop={false}/>
        <div className="login">
            <div className="auth-form-container">
            <a className="btn btn-outline-light" href='/registeremployer'><h6>Employer</h6></a>
            <a className="btn btn-outline-light" href='/registerjobseeker'><h6>Job Seeker</h6></a>
            <h2>Register Employer</h2>
            <br />
        <form className="register-form" >
        <FormControl  >
            
            <TextField label="OrganizationName" value={organizationName} onChange={handleFieldName} type="text" 
            className="form-control" name="organizationName" id="organizationName" placeholder="Organization Name" aria-errormessage="Required"/>
            {fieldError && <h6 style={{color: 'red'}}>{fieldError}</h6>}
            
            <br />
            
           
            <TextField label="Address" value={address} onChange={handleFieldAddress}type="text" className="form-control" placeholder="address" id="address" name="address" />
            
            {addressError && <h6 style={{color: 'red'}}>{addressError}</h6>}
                <br />
               
          
            <TextField label="ContactNumber" value={contact_number}  onChange={handleContact}type="text" className="form-control" placeholder="contact_no" id="contact_no" name="contact_no" />
            {contactError && <h6 style={{color: 'red'}}>{contactError}</h6>}
            <br />
           
            
            <TextField label="Email" value={email} onChange={handleChange}type="email" className="form-control" placeholder="user@gmail.com" id="email" name="email" 
            />
                           {mailError && <h6 style={{color: 'red'}}>{mailError}</h6>}
                             
                             <br />
                           
            
            <TextField label="Username" value={username} onChange={handleFieldUser} type="text" className="form-control"  id="username" name="username" 
           />
               {userError && <h6 style={{color: 'red'}}>{userError}</h6>}
            
            <br />
          
            
            <TextField label="Password" value={password} onChange={handleFieldPass} type="password" placeholder="********" id="password" name="password"  
           />
            {passError && <h6 style={{color: 'red'}}>{passError}</h6>}
        
            <br/>
          </FormControl>
            
            <Button variant="contained" onClick={onSignup}>Register</Button>
        </form>
      
        <a className="link-btn" href="/login">Already have an account? Login here.</a>
        
    </div>
    </div>
    </div>

    )
}