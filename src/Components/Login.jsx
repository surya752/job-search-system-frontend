import { Alert } from "bootstrap";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EmployerService from "../Service/EmployerService";
import './login.css';
import Navbar from "./NavBar";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from "@mui/material";

export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [flag,setFlag] = useState('');
    const history = useNavigate();
    useEffect(()=>{getDatabase('Employer');},[])

     // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // User Login info
  const [database,setDatabase]=useState([]);
  const getDatabase=(role)=>{
    if(role==='Employer')
    {
      setFlag('Employer')
    EmployerService.getAllEmployers().then((response)=>{
      setDatabase(response.data)
      console.log(response.data);
    }).catch(error => {
      console.log(error);
  })
    }
    else
    {
      setFlag('JobSeeker')
      EmployerService.getAllJobSeeker().then((response)=>{
        setDatabase(response.data)
        console.log(response.data);
      }).catch(error => {
        console.log(error);
    })
    }
  }
  const checkLogin=(e)=>{
    e.preventDefault();
    const userData = database.find((user) => user.username === email);
    if (userData) {
      if (userData.password !== pass) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        //toast.success('Login Succesfull '+flag,{position:toast.POSITION.TOP_CENTER,autoClose:false});
        setIsSubmitted(true);
        if(flag=='Employer')
        {
          sessionStorage.setItem('id',userData.organizationName)
          sessionStorage.setItem('role','Employer')
          sessionStorage.setItem('employerId',userData.id)
          alert('Login Successfull '+sessionStorage.getItem('role'))
          history('/employer/jobs')
        }
        else
        {
          sessionStorage.setItem('id',userData.jobseeker_Id)
          sessionStorage.setItem('role','JobSeeker')
          alert('Login Successfull '+sessionStorage.getItem('role'))
          history('/jobseeker/jobs')
        }
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  }

  const errors = {
    uname: "invalid username",
    pass: "invalid password"
  };

   
   const renderErrorMessage = (name) =>
   name === errorMessages.name && (
     <div className="error">{errorMessages.message}</div>
   );
    return (
      <div><Navbar/><ToastContainer/>
      <div className="auth-form-container login">
        <h2> Login</h2>
        <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
          <input type="radio" class="btn-check" name="btnradio" id="btnradio1"  onClick={()=>getDatabase('Employer')} autocomplete="off" />
          <label class="btn btn-outline-light" for="btnradio1">Employer</label>
          <input type="radio" class="btn-check" name="btnradio" id="btnradio2"  onClick={()=>getDatabase('JobSeeker')} autocomplete="off" />
          <label class="btn btn-outline-light" for="btnradio2">Job Seeker</label>
        </div>
        <form className="login-form" >
          <label htmlFor="email">Username:</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="your name" id="email" name="email" required="true" />
          {renderErrorMessage("uname")}
          <label htmlFor="password">Password:</label>
          <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" required="true" />
          {renderErrorMessage("pass")}
          <br />
          <Button type="btn" variant="contained" onClick={(e)=>checkLogin(e)}>Log In</Button>
        </form>
        <a className="link-btn" href="/registeremployer">Don't have an account? Register here.</a>
      </div>
      </div>
    )
}
