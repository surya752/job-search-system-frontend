import { Button, FormControl, FormGroup, Input, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { useState } from "react";
import JobSeekerService from "../Service/JobSeekerService";
import Navbar from "./NavBar";
import { toast, ToastContainer } from "react-toastify";

export const RegisterJobSeeker = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [contact_no, setContactNo] = useState('');
    const [locationPreference, setLocationPreference] = useState('');
    const [skill, setSkill] = useState('');
    const [skill2, setSkill2] = useState('');
    const [skillLevel, setSkillLevel] = useState('');
    const [skillLevel2, setSkillLevel2] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [mailError, setMailError] = useState('');
    const [contactError, setContactError] = useState('');
    const [fieldError, setFieldError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [userError, setUserError] = useState('');
    const [passError, setPassError] = useState('');
    const [locationError, setLocationError] = useState('');
    const [skillError, setSkillError] = useState('');
    const [skillError2, setSkillError2] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(email);
    }


    function isValidFields(name) {
        return /^[A-Za-z][A-Za-z0-9_]{7,29}$/.test(name);
    }

    const handleFieldName = event => {

        if (!isValidFields(event.target.value) && event.target.value.length <= 4) {

            setFieldError('Please enter valid name with atleast 5 characters');
        }
        else {
            setFieldError(null);
        }

        setName(event.target.value);
    }
    const handleFieldAddress = event => {

        if (!isValidFields(event.target.value) && event.target.value.length <= 4) {

            setAddressError('Please enter valid address ');
        }
        else {
            setAddressError(null);
        }

        setAddress(event.target.value);
    }
    const handleFieldUser = event => {

        if (!isValidFields(event.target.value) && event.target.value.length <= 4) {

            setUserError('Please enter valid username');
        }
        else {
            setUserError(null);
        }

        setUsername(event.target.value);
    }

    const handleFieldLocation = event => {

        if (!isValidFields(event.target.value) && event.target.value.length < 4) {

            setLocationError('Please enter your location preference');
        }
        else {
            setLocationError(null);
        }

        setLocationPreference(event.target.value);
    }

    const handleFieldSkill = event => {

        if (!isValidFields(event.target.value) && event.target.value.length < 4) {

            setSkillError('Please enter your Skill');
        }
        else {
            setSkillError(null);
        }

        setSkill(event.target.value);
    }
    const handleFieldSkill2 = event => {

        if (!isValidFields(event.target.value) && event.target.value.length < 4) {

            setSkillError2('Please enter your Skill');
        }
        else {
            setSkillError2(null);
        }

        setSkill2(event.target.value);
    }

    const handleFieldPass = event => {

        if (!isValidFields(event.target.value) && event.target.value.length < 8) {

            setPassError('Please enter password with length>=8');
        }
        else {
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
    const handleContact = event => {
        if (!isValidContact(event.target.value)) {
            setContactError('Please enter the contact in (123-456-7890) format');
        } else {
            setContactError(null);
        }
        setContactNo(event.target.value)
    }


    const onSignup = (e) => {
        e.preventDefault();
        console.log("here");
        alert(name);
        const user = {
            jobseekerName: name,
            address: address,
            contactNumber: contact_no,
            email: email,
            locationPreference: locationPreference,
            username: username,
            password: password,
            skillSet: [{
                skill: skill,
                skillLevel: skillLevel
            }, {
                skill: skill2,
                skillLevel: skillLevel2
            }]



        };
        console.log(user);
        alert(user.name, " Hello");
        JobSeekerService.registerJobSeeker(user).then(response => {
            const { data } = response;
            alert("Hello registering of the new account is successful", data.name);
            props.history.push("/logIn");
        }).catch(error => {
            //alert("error",error);
        });


    }


    return (
        <div><Navbar /><ToastContainer newestOnTop={false} />
            <div className="login">
                <div className="auth-form-container">
                    <a className="btn btn-outline-light" href='/registeremployer'><h6>Employer</h6></a>
                    <a className="btn btn-outline-light" href='/registerjobseeker'><h6>Job Seeker</h6></a>
                    <h2>Register Job Seeker</h2>

                    <FormControl className="register-form" onSubmit={handleSubmit}>


                        <TextField label="Name" value={name} onChange={handleFieldName} type="text" className="form-control" name="name" id="name" placeholder="Name" />
                        {fieldError && <h6 style={{ color: 'red' }}>{fieldError}</h6>}

                        <br />


                        <TextField label="Address" value={address} onChange={handleFieldAddress} type="text" className="form-control" placeholder="address" id="address" name="address" />

                        {addressError && <h6 style={{ color: 'red' }}>{addressError}</h6>}
                        <br />


                        <TextField label="ContactNumber" value={contact_no} onChange={handleContact} type="text" className="form-control" placeholder="contact_no" id="contact_no" name="contact_no" />
                        {contactError && <h6 style={{ color: 'red' }}>{contactError}</h6>}
                        <br />


                        <TextField label="Email" value={email} onChange={handleChange} type="email" className="form-control" placeholder="youremail@gmail.com" id="email" name="email" />
                        {mailError && <h6 style={{ color: 'red' }}>{mailError}</h6>}

                        <br />



                        <TextField label="LocationPreference" value={locationPreference} onChange={handleFieldLocation} type="text" className="form-control" placeholder="locationPreference" id="locationPreference" name="locationPreference" />
                        {locationError && <h6 style={{ color: 'red' }}>{locationError}</h6>}

                        <br />


                        <TextField label="Skill" value={skill} onChange={handleFieldSkill} type="text" className="form-control" placeholder="skill" id="skill" name="skill" />
                        {skillError && <h6 style={{ color: 'red' }}>{skillError}</h6>}
                        <br />
                        <FormControl>
                            <InputLabel htmlFor="skillLevel2">Select SkillLevel</InputLabel>
                            <Select value={skillLevel} onChange={(e) => setSkillLevel(e.target.value)} label="Select" name="skillLevel1" id="skillLevel1" required>

                                <MenuItem value="Beginner">Beginner</MenuItem>
                                <MenuItem value="Intermediate">Intermediate</MenuItem>
                                <MenuItem value="Advanced">Advanced</MenuItem>
                            </Select>

                            <br />


                            <TextField label="Skill2" value={skill2} onChange={handleFieldSkill2} type="text" className="form-control" placeholder="skill2" id="skill2" name="skill2" />
                            {skillError2 && <h6 style={{ color: 'red' }}>{skillError2}</h6>}
                        </FormControl> <br />
                        <FormControl>
                            <InputLabel htmlFor="skillLevel2">Select SkillLevel</InputLabel>
                            <Select value={skillLevel2} onChange={(e) => setSkillLevel2(e.target.value)} label="Select" name="skillLevel2" id="skillLevel12" required>

                                <MenuItem value="Beginner">Beginner</MenuItem>
                                <MenuItem value="Intermediate">Intermediate</MenuItem>
                                <MenuItem value="Advanced">Advanced</MenuItem>
                            </Select>
                        </FormControl>
                        <br />


                        <TextField label="Username" value={username} onChange={handleFieldUser} type="text" className="form-control" placeholder="username" id="username" name="username" />
                        {userError && <h6 style={{ color: 'red' }}>{userError}</h6>}
                        <br />


                        <TextField label="Password" value={password} onChange={handleFieldPass} type="password" placeholder="********" id="password" name="password" />
                        {passError && <h6 style={{ color: 'red' }}>{passError}</h6>}
                        <br />

                        <Button variant="contained" onClick={onSignup}>Register</Button>
                    </FormControl>
                    <a className="link-btn" href="/login">Already have an account? Login here.</a>
                </div>
            </div>
        </div>
    )
}