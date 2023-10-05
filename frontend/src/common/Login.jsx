import React, { useEffect, useState, useContext } from 'react';
import AppContext from '../context/AppContext';
import "../css/login.css";
import authService from '../services/authService';
import { defaultUserProfileImage } from '../services/constans';

export function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { roll, setRoll, userDetail, setUserDetail } = useContext(AppContext);

  const [localUserDetail, setLocalUserDetail] = useState({
    id: "id",
    name: 'name',
    email: "email",
    roll: "admin"
  });

  useEffect(() => {
    console.log("localUserDetail changed");
  }, [localUserDetail])

  useEffect(() => {
    console.log("email useEffect userDetail : ", userDetail);
  }, [userDetail])

  function handelEmailChangeEvent(email) {
    setEmail(email);
    setLocalUserDetail(prevUserDetail => ({
      ...prevUserDetail,
      email: email
    }));
    console.log("handelEmailChangeEvent localUserDetail : ", localUserDetail);

  }
  function handleLogin() {

    // if (email == "") {
    //   alert("email is required");
    //   return;
    // }
    // if (password.length < 6) {
    //   alert("password have to minimum 6 char");
    //   return;
    // }

    var cred = {
      email: email,
      password: password,
    }
    authService.login(cred).then((response) => {
      console.log("login  || response : ", response);
      alert(response.message);

      var tmp = {
        id: response.user._id,
        name: response.user.name,
        email: response.user.email,
        roll: response.user.role
      }
      if (response.userProfile) {
        tmp.isProfile = true;
        tmp.profileImage=response.userProfile.profileImage;
      } else {
        tmp.isProfile = false;
        tmp.profileImage=defaultUserProfileImage;
      }

      console.log("handleLogin  userDetail : ", tmp);
      localStorage.setItem("userDetail", JSON.stringify(tmp));
      setUserDetail(tmp);
      setRoll(response.user.role);

    }).catch((err) => {
      console.log("login  || err : ", err);
      alert(err.message);
    })


  }

  function registerRedirect() {
    setRoll("register");
  }
  return (
    <div className='login flex items-center justify-center'>

      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-6" action="#">
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">Login</h5>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
            <input type="email" name="email" value={email} onChange={(e) => { handelEmailChangeEvent(e.target.value); }} placeholder="Enter Email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Password</label>
            <input type="password" name="password" value={password} onChange={(e) => { setPassword(e.target.value); }} id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
          </div>

          <button type="button" onClick={() => { handleLogin(); }} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered? <a onClick={() => { registerRedirect(); }} className="text-blue-700 hover:underline dark:text-blue-500">Create account</a>
          </div>
        </form>
      </div>

    </div>
  );
}

