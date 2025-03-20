import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import JobSeekerService from '../Service/JobSeekerService';
import Navbar from './NavBar';
import Slideshow from './SlideShow';
import './font.css'
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';


const HomePage = () => {
    const [jobs, setJobs] = useState([])
    
    useEffect(() => { getAllJobs(); }, [])

    const getAllJobs = () => {
        JobSeekerService.getJobs().then((response) => {
            setJobs(response.data)
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <div>
            <Navbar />
            <Slideshow />
            <div className='container-fluid row ' >
            {jobs.map(job =>
                <Card sx={{ minWidth: 200 ,backgroundColor:'azure'}} className='col-3 m-5 text'>
                <CardContent>
                <Typography variant="h5" component="div">
                  {job.title}
                  </Typography>
                  <Typography sx={{ fontSize: 18 }} color="text.primary" gutterBottom>
                  CTC : {job.salary}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Location : {job.location}
                  </Typography>
                  <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
                  Skill Required :{job.skillSet}
                    <br />
                    Email : {job.email}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color='success' href='/login'>Apply</Button>
                </CardActions>
              </Card>
                )}
        </div>
        </div >
    );
}

export default HomePage