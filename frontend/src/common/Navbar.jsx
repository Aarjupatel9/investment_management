import React , {useContext} from 'react'
import AppContext from '../context/AppContext';
import { Navigate, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { defaultUserProfileImage } from '../services/constans';

export default function Navbar() {

    const  { roll, setRoll , userDetail, setUserDetail } = useContext(AppContext);

    const navigate = useNavigate();

    function logout() {
        const userDetailTmp = {
            id: "id",
            name: 'name',
            email: "email",
            roll: "anonymous"
        };
        console.log("val : ", userDetailTmp);
        setUserDetail(userDetailTmp);
        navigate("/");
        window.location.reload();
        authService.logout();
    }

    function openUserProfile() {
        navigate("/profile");
    }

    return (
        <nav className="MyNavBar z-50 w-full bg-gray-500 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start">

                        <a href="https://flowbite.com" className="flex ml-2 md:mr-24">
                            <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="FlowBite Logo" />
                            <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">User</span>
                        </a>
                    </div>
                    <div className="flex items-center">
                        <div className="flex items-center ml-3">
                            <div className='mx-3'>
                                <button type="button" onClick={() => { openUserProfile(); }} className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                                    <img className="w-8 h-8 rounded-full" src={defaultUserProfileImage} alt={userDetail.name} />
                                </button>
                            </div>
                            <div className='mx-3'>
                                <button type="button" onClick={() => { logout(); }} className="flex p-1 text-sm bg-gray-300 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                                    Logout</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
