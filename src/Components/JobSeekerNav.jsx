import React from 'react'
import { useState } from 'react';
import {  MdAddToQueue, MdLogout, MdWork, MdWorkOutline } from "react-icons/md";
import { BsBasket3Fill } from "react-icons/bs";
import { ImProfile } from "react-icons/im";
import './navbar.css'
import image from './JobSeekerComponents/jssjs.png'
import JobSeekerService from '../Service/JobSeekerService';
function JobSeekerNav() {
    const [isNavExpanded, setIsNavExpanded] = useState(false)

    return (
        
        <nav className="navigation">
            <a href="/jobseeker/jobs" className="brand-name">
                <img src={image} ></img>
            </a>
            <button
                className="hamburger"
                onClick={() => {
                    setIsNavExpanded(!isNavExpanded)
                }}
            >
                {/* hamburger svg code... */}
            </button>
            <div
                className={
                    isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
                }
            >
                <ul>
                    <li>
                        <a href="/jobseeker/jobs"><MdWork/> Jobs</a>
                    </li>
                    <li>
                        <a href="/jobseeker/appliedjobs"><MdAddToQueue/> Applied Jobs</a>
                    </li>
                    <li>
                        <a href="/jobseeker/profile"> <ImProfile/> Profile</a>
                    </li>
                    <li >
                        <a href="/jobseeker/jobbasket" ><BsBasket3Fill/> Basket
                        </a>
                    </li>
                    <li>
                        <a href="/" onClick={()=>sessionStorage.clear()}><MdLogout/> Log out</a>
                    </li>
                </ul>
            </div>
        </nav>
  )
}

export default JobSeekerNav