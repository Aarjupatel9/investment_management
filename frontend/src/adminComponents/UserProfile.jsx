import React, { useEffect, useState , useContext} from 'react';
import AppContext from '../context/AppContext';

import "../css/login.css";

export function UserProfile() {


const  { roll, setRoll , userDetail, setUserDetail } = useContext(AppContext);
  

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userDetailsTemplate = {
    id: "id",
    name: 'name',
    email: "email",
    roll: "roll"
  };

  useEffect(() => {
    console.log("userDetails changed");
  }, [userDetail])

  useEffect(() => {
    console.log("email useEffect userDetail : ", userDetail);
  }, [userDetail])


  return (
    <div className='login flex items-center justify-center'>

      <div className="">
        {userDetail != userDetailsTemplate ? (
          <div className="container rounded bg-white mt-5 mb-5">
            <div className="row">

              <div className="col-md-3 border-right">


                <div
                  className="d-flex flex-column align-items-center text-center p-3 py-5"
                // onMouseEnter={() => setShowOptions(true)}
                // onMouseLeave={() => setShowOptions(false)}
                >
                  <div className="profile-image-container">
                    <img
                      alt="profile image"
                      className="rounded-circle mt-5 profile-image"
                      width="200px"
                    // src={imageData}
                    // onError={(e) => {
                    //   e.target.src = process.env.REACT_APP_DEFAULT_PROFILE_IMAGE;
                    // }}
                    />
                    {/* {showOptions && (
                      <div className="image-options">
                        <label htmlFor="file-input" className="change-image">
                          Change Image
                        </label>
                        <div className="remove-image" onClick={removeImage}>
                          Remove Image
                        </div>
                      </div>
                    )} */}
                  </div>
                  <span className="font-weight-bold mt-3">
                    Account name: {userDetail.name}
                  </span>
                  <span className="text-black-50">
                    Account number: {userDetail.id}
                  </span>
                  <input
                    type="file"
                    id="file-input"
                    accept="image/*"
                    style={{ display: 'none' }}
                  // onChange={handleDrop}
                  />
                </div>


              </div>
              <div className="col-md-5 ">
                <div className="p-3 py-5">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right">Profile Information</h4>
                  </div>
                  <div className="row mt-2">
                    <div className="col-md-6">
                      <label className="labels">Display Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={userDetail.name}
                      // onChange={(e) => {
                      //   setDisplayName(e.target.value);
                      // }}
                      />
                    </div>
                  </div>


                  <div className="row mt-2">
                    <div className="col-md-12">
                      <label className="labels">About</label>
                      <input
                        type="text"
                        className="form-control"
                        value={userDetail.email}
                      // onChange={(e) => {
                      //   setAbout(e.target.value);
                      // }}
                      />
                    </div>
                  </div>

                  {userDetail.id ? <div className="row mt-3">
                    <div className="col-md-12">
                      <label className="labels">Recovery Email</label>
                      <input
                        type="text"
                        className="form-control"
                        value={userDetail.email}
                        readOnly
                      />
                    </div>
                  </div> : <div className="row mt-3">
                    <div className="col-md-12">
                      <label className="labels font-weight-bold">Recovery Email is not added, please add throw android device</label>
                    </div>
                  </div>}

                  <div className="mt-5 text-center">
                    <button
                      className="btn btn-primary profile-button"
                      type="button"
                      onClick={() => {
                        // saveUserDetails();
                      }}
                    >
                      Save Profile
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        ) : (
          <h3>please login firt</h3>
        )}
      </div>

    </div>
  );
}


