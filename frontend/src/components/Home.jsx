import React, { useEffect, useContext } from 'react'
import AppContext from '../context/AppContext'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import TmpCpm from '../common/TmpCpm'
import { EditUserProfile } from './EditUserProfile'
import { UserProfile } from './UserProfile'
import EditBankAccount from './EditBankAccount';
import BankAccounts from "./BankAccounts";
import EditFd from './EditFd';
import Fd from './Fd'
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "../css/Home.css";
import Lic from './Lic'
import Propety from './Property'
import Locker from './Locker'
import Stocks from './Stocks'
import MutualFunds from './MutualFunds'

export default function Home() {
    useEffect(() => { console.log("user home log") }, []);
    const { userDetail, setUserDetail } = useContext(AppContext);
    return (
        <div className='Home'>
            <Navbar />
            <div className='NotMyNavbar'>
                <Sidebar />
                <div className="MainComponents myscroll">
                    <Routes>
                        {userDetail.isProfile ? <>

                            <Route path="/" element={<TmpCpm />} />
                            <Route path="/profile" element={<UserProfile />} />

                            <Route path="/bankaccount" element={<BankAccounts />} />
                            <Route path="/AddBankAccount" element={<EditBankAccount />} />
                            <Route path="/editBankAccount/:id" element={<EditBankAccount />} />

                            <Route path="/fd" element={<Fd />} />
                            <Route path="/AddFd" element={<EditFd />} />
                            <Route path="/editFd/:id" element={<EditFd />} />

                            <Route path="/mutualFunds" element={<MutualFunds />} />
            
                            <Route path="/stocks" element={<Stocks />} />
                            <Route path="/lic" element={<Lic />} />
                            <Route path="/locker" element={<Locker />} />
                            <Route path="/property" element={<Propety />} />
                        </>
                            :<></>
                        }
                        <Route path="/editProfile" element={<EditUserProfile />} />
                        <Route path="*" element={<EditUserProfile />} />

                    </Routes>
                </div>
            </div>
        </div>
    )
}
