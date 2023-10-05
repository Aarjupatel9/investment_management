import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './css/App.css';
import Home from './components/Home';
import AdminHome from './adminComponents/Home';
import { Login } from "./common/Login"
import Signup from './common/Signup';
import authService from './services/authService';
import AppContext from './context/AppContext';
import toast,{Toaster} from 'react-hot-toast';

function App() {

  const [userDetail, setUserDetail ]  =useState({
    id: "id",
    name: 'name',
    email: "email",
    roll: "anonymous"
  });
  const [roll, setRoll] = useState("anonymous");

  useEffect(() => {
    // setRoll(userDetail.roll);
    console.log("id : ", roll);
  }, [userDetail])

  useEffect(() => {

    const localUserDetail = authService.getCurrentUser();
    setUserDetail(localUserDetail);
    setRoll(localUserDetail.roll);
  }, []);

  return (<>
  
      <Toaster position="top-center" reverseOrder={false} />
    <AppContext.Provider value={{ roll, setRoll , userDetail, setUserDetail}}>
      { roll === 'anonymous' ? <Login /> : roll === 'register' ? <Signup /> : roll === 'user' ? <Home />  : roll === 'admin' ? <AdminHome />  : <></>}
    </AppContext.Provider>
  </>
  );
}

export default App;
