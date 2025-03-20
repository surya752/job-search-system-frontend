import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EmployerService from '../Service/EmployerService'

const SignUpComponent = () => {

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const history = useNavigate();

    const saveUser= (e) => {
        e.preventDefault();

        const user = {userName, password}

        if(password !== confirmPassword)
        {
            alert('Password mismatch!')
            return
        }
        EmployerService.createEmployee(user).then((response) =>{

                alert('Successful sign up')
                console.log(response.data)
    
                history('/');
    
            }).catch(error => {
                alert('Error in sign')
                console.log(error)
            })
        }
        
  return (
    <div>
           <br /><br />
           <div className = "container">
                <div className = "row">
                    <div className = "card col-md-6 offset-md-3 offset-md-3">
                    <h2 className = "text-center">Sign Up</h2>
                        <div className = "card-body">
                            <form>
                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Username :</label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter user name"
                                        name = "userName"
                                        className = "form-control"
                                        value = {userName}
                                        onChange = {(e) => setUserName(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Password :</label>
                                    <input
                                        type = "password"
                                        placeholder = "Enter password"
                                        name = "password"
                                        className = "form-control"
                                        value = {password}
                                        onChange = {(e) => setPassword(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Confirm Password :</label>
                                    <input
                                        type = "password"
                                        placeholder = "Confirm password "
                                        name = "confirmPassword"
                                        className = "form-control"
                                        value = {confirmPassword}
                                        onChange = {(e) => setConfirmPassword(e.target.value)}
                                    >
                                    </input>
                                </div>
                                <button className = "btn mt-3 ml-5 btn-success" onClick= {(e) => saveUser(e)}>Sign Up </button>
                              
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default SignUpComponent