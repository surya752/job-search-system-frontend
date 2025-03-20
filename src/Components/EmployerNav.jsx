import React from 'react'
import { useState } from 'react';
import {  MdLogout, MdPostAdd, MdWork, MdWorkOutline } from "react-icons/md";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { ImProfile } from "react-icons/im";
import './navbar.css'
import image from './EmployerComponents/jsse.png'
function EmployerNav() {
    const [isNavExpanded, setIsNavExpanded] = useState(false)

    return (
        <nav className="navigation">
            <a href="/employer/jobs" className="brand-name">
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
                        <a href="/employer/jobs"><MdWork/> Jobs</a>
                    </li>
                    <li>
                        <a href="/employer/postjob"><MdPostAdd/> Post Job</a>
                    </li>
                    <li>
                        <a href="/employer/jobseeker"> <BsFillPersonLinesFill/> Job Seeker</a>
                    </li>
                    <li >
                        <a href="/employer/profile" ><ImProfile/> Profile</a>
                    </li>
                    <li>
                        <a href="/" onClick={()=>sessionStorage.clear()}><MdLogout/> Log out</a>
                    </li>
                </ul>
            </div>
        </nav>
  );
}

export default EmployerNav