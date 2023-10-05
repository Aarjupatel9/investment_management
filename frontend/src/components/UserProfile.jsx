import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import "../css/login.css";
import userService from '../services/userService';
import authService from '../services/authService';
import { defaultUserProfileImage } from '../services/constans';
import { userProfileTemplate } from './EditUserProfile';


export const UserProfile = ({ readOnly }) => {


  const [userProfile, setUserProfile] = useState(userProfileTemplate);

  useEffect(() => {

  }, []);


  const { id } = useParams();;

  useEffect(() => {
    console.log("id : ", id);
    if (id) {
      userService.getUserProfile(id).then((unTypedRes) => {
        const res = unTypedRes;
        const userProfile = res.profile;
        console.log("userProfile : ", userProfile);
        if (userProfile) {
          setUserProfile(userProfile);
        }
      }).catch((error) => {
        console.log("error : ", error);
      })
    } else {
      userService.getUserProfile(authService.getCurrentUserId()).then((unTypedRes) => {
        const res = unTypedRes;
        const userProfile = res.profile;
        console.log("userProfile : ", userProfile);
        if (userProfile) {
          setUserProfile(userProfile);
        }
      }).catch((error) => {
        console.log("error : ", error);
      })
    }
  }, [id]);

  return (

    <div className="">
      {!readOnly ?
        <nav className="bg-gray-300 border-gray-200 dark:bg-gray-900">
          <div className="flex flex-wrap   items-center justify-end mx-auto px-3 py-1">
            <div className="flex md:order-2  p-2">
              <ul className="flex flex-col  font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li className=''>
                  <Link to={"/editProfile"} className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Update Profile</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav> : <></>}
      {userProfile != userProfileTemplate ? (

        <div className={`flex px-2 flex-col mt-5 ${readOnly ? "" : "shadow-md sm:rounded-lg"}`}>
          <h1 className="text-3xl mx-auto font-medium text-gray-900 dark:text-white">Profile</h1>
          <hr className="my-2" />
          <div className="m-1 p-5 flex flex-col">
          <div
              className="mb-12 w-48 h-auto mt-2 mx-auto " >
              <img className="rounded-full w-48 h-48"

                alt="profile image"
                src={userProfile.profileImage}
                onError={(e) => {
                  e.target.src = defaultUserProfileImage;
                }}
              />
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="w-full mb-6">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">First name</p>
                <p className="text-sm text-gray-900 dark:text-white">{userProfile.firstName}</p>
              </div>
              <div className="w-full mb-6">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Last name</p>
                <p className="text-sm text-gray-900 dark:text-white">{userProfile.lastName}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="w-full mb-6">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone number</p>
                <p className="text-sm text-gray-900 dark:text-white">{userProfile.personalDetails.mobileNo}</p>
              </div>
              <div className="w-full mb-6">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">AadharNumber</p>
                <p className="text-sm text-gray-900 dark:text-white">{userProfile.personalDetails.aadharNumber}</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="w-full mb-6">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">PanNumber</p>
                <p className="text-sm text-gray-900 dark:text-white">{userProfile.personalDetails.panNumber}</p>
              </div>
              <div className="w-full mb-6">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">DateOfBirth</p>
                <p className="text-sm text-gray-900 dark:text-white">{userProfile.personalDetails.dateOfBirth}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="w-full mb-6">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">City</p>
                <p className="text-sm text-gray-900 dark:text-white">{userProfile.address.city}</p>
              </div>
              <div className="w-full mb-6">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">State</p>
                <p className="text-sm text-gray-900 dark:text-white">{userProfile.address.state}</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="w-full mb-6">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Country</p>
                <p className="text-sm text-gray-900 dark:text-white">{userProfile.address.country}</p>
              </div>
              <div className="w-full mb-6">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Pincode</p>
                <p className="text-sm text-gray-900 dark:text-white">{userProfile.address.pincode}</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="w-full mb-6">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Designation</p>
                <p className="text-sm text-gray-900 dark:text-white">{userProfile.designation}</p>
              </div>

            </div>


            {userProfile.nominee.map((tmp) => {
              return (<div className="grid md:grid-cols-3 md:gap-6">
                <div className="w-full mb-6">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Nominee Name</p>
                  <p className="text-sm text-gray-900 dark:text-white">{tmp.name}</p>
                </div>
                <div className="w-full mb-6">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Nominee Email</p>
                  <p className="text-sm text-gray-900 dark:text-white">{tmp.email}</p>
                </div>
                <div className="w-full mb-6">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">User RelationShip</p>
                  <p className="text-sm text-gray-900 dark:text-white">{tmp.relationship}</p>
                </div>
              </div>)

            })}
          </div>
        </div>


      ) : (
        <div className={`flex flex-col m-3 p-3 ${readOnly ? "" : "shadow-md sm:rounded-lg"}`}>
          <h3 className="text-3xl mx-auto font-medium text-red-900 dark:text-white">{readOnly ? "Profile details is not filled up by user" : "Please update profile details"}</h3>
        </div>)}
    </div>

  );
}

