import React, { useEffect } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import TmpCpm from '../common/TmpCpm'
import { UserProfile } from './UserProfile'
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "../css//Home.css";
export default function AdminHome() {
    useEffect(()=>{console.log("admin home log")},[]);
    return (
        <div className='home'>

            <Navbar />

            <div className='NotMyNavbar'>

                <Sidebar />

                <div className="MainComponents ">
                    <Routes>
                        <Route path="/" element={<TmpCpm />} />
                        <Route path="/profile" element={<UserProfile />} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}
