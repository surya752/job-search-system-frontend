import { useState } from 'react';
import {  MdHome, MdInfo, MdLogin, MdOutlineAssignment,  MdPhone, MdWorkOutline } from "react-icons/md";
import './navbar.css'
import image from './jss.png'
export default function Navbar() {
    const [isNavExpanded, setIsNavExpanded] = useState(false)

    return (
        <nav className="navigation">
            <a href="/" className="brand-name">
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
                        <a href="/"><MdHome/> Home</a>
                    </li>
                    <li>
                        <a href="/about"><MdInfo/> About</a>
                    </li>
                    <li>
                        <a href="/contact"> <MdPhone/> Contact</a>
                    </li>
                    <li>
                    <a href="/registeremployer"><MdOutlineAssignment/> Register</a>
                    </li>
                    <li>
                        <a href="/login"><MdLogin/> Sign In</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}