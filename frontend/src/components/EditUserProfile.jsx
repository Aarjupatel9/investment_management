import React, { useEffect, useState, useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { profileDetailValidator } from '../validator/profileValidator';
import { toast } from 'react-hot-toast';
import userService from '../services/userService';
import AppContext from '../context/AppContext';
import authService from '../services/authService';
import { defaultUserProfileImage } from '../services/constans';

export const userDetailTemplate = {
    email: "email",
    isApproved: false,
    isEmailVerified: true,
    isVerified: false,
    role: "",
    __v: 0,
    VerifiedBy: "",
    _id: "id",
    name: "name",

    isProfile: false
};
export const userProfileTemplate = {
    userId: "",
    firstName: "",
    lastName: "",
    personalDetails: {
        mobileNo: "",
        aadharNumber: 0,
        panNumber: "",
        dateOfBirth: new Date(),

    },
    nominee: [],
    designation: "",
    address: {
        city: "",
        state: "",
        country: "",
        pincode: "",
    },

    profileImage: "abc"
};
const StateInfo = {
    GUJARAT: "gujarat",
    HIMACHAL_PRADESH: "himachal_predesh",
    KERALA: "karela",
    RAJASTAHN: "rajasthan",
    UTTAR_PRADESH: "uttar_pradesh"

}
const CityInfo = {
    AHMEDABAD: "ahmedabad",
    SURAT: "surat",
    VADODARA: "vadodara",
    BHARUCH: "bharuch",
    RAJKOT: "rajkot",
    ANAND:"anand",
    GANDHINAGAR:"gandhinagar",
    NAVSARI:"navsari",

}
const CountryInfo = {
    INDIA: "india",
    AUSTRALIA: "australia",
    JAPAN: "japan",
    ITALY: "italy",
    UK: "uk",
    GARMANY:"garmany",
    CANADA:"canada"

}
export const EditUserProfile = () => {

    const [rowData, setRowData] = useState({ nominee: { name: "", email: "", relationship: "" } });
    const { userDetail, setUserDetail } = useContext(AppContext);
    const navigate = useNavigate();
    const [userProfile, setUserProfile] = useState(userProfileTemplate);

    const handleRowDataInputChange = (event) => {
        const { name, value } = event.target;
        if (name.startsWith("nominee.")) {
            const [parent, child] = name.split(".");
            setRowData((prevData) => ({
                ...prevData,
                nominee: {
                    ...prevData.nominee,
                    [child]: value,
                },
            }));
        }
    }

    const handleAddnominee = () => {
        const nominee = rowData.nominee;

        if (nominee.name.trim() !== '') {
            setUserProfile((prevData) => ({
                ...prevData,
                nominee: [...prevData.nominee, { name: nominee.name, email: nominee.email, relationship: nominee.relationship }],
            }));
            setRowData((prevData) => ({
                ...prevData,
                nominee: { name: "", email: "", relationship: "" },
            }));
        }
    };

    const handleRemovenominee = (index) => {
        const updatedExperts = [...userProfile.nominee];
        updatedExperts.splice(index, 1);
        setUserProfile((prevData) => ({
            ...prevData,
            nominee: updatedExperts,
        }));
    };



    const handleInputChange = (event) => {
        const { name, value } = event.target;

        if (name == "profileImage") {
            // imageUploadHandle(event);
            return;
        }
        console.log("enter in handle input change");
        // If the input is nested within personalDetails or bankDetails, update accordingly
        if (name.startsWith("personalDetails.")) {
            const [parent, child] = name.split(".");
            setUserProfile((prevData) => ({
                ...prevData,
                personalDetails: {
                    ...prevData.personalDetails,
                    [child]: value,
                },
            }));
        } else if (name.startsWith("bankDetails.")) {
            const [parent, child] = name.split(".");
            setUserProfile((prevData) => ({
                ...prevData,
                bankDetails: {
                    ...prevData.bankDetails,
                    [child]: value,
                },
            }));
        } else if (name.startsWith("address.")) {
            const [parent, child] = name.split(".");
            setUserProfile((prevData) => ({
                ...prevData,
                address: {
                    ...prevData.address,
                    [child]: value,
                },
            }));
        } else {
            console.log("handleInputChange else change : ", name)
            setUserProfile((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handelProfileUpload = () => {
        console.log('Form Data:', userProfile); // You can process the data as needed
        const { error } = profileDetailValidator.validate(userProfile);
        if (error) {
            toast.error(error.toString());
            return;
        }
        const profileUpdatePromise = userService.updateProfile(userProfile);
        profileUpdatePromise.then((res) => {
            // if (!userDetail.isProfile) {
            //     toast.success("please login again");
            //     console.log("val : ", userDetailTemplate);
            //     setUserDetail(userDetailTemplate);
            //     authService.logout();
            //     navigate("/");
            //     window.location.reload();
            // }
        })
        toast.promise(
            profileUpdatePromise,
            {
                loading: 'please wait while we updating your profile',
                success: (data) => data.message,
                error: (err) => err.toString(),
            },
            {
                style: {
                    minWidth: '250px',
                },
                success: {
                    duration: 5000,
                    icon: '🔥',
                },
                error: {
                    duration: 5000,
                    icon: '🔥',
                },
            }
        );
    };

    useEffect(() => {
        console.log(userProfile);
    }, [userProfile]);

    useEffect(() => {
        setUserProfile((prevData) => ({ ...prevData, userId: authService.getCurrentUserId() }));
        userService.getUserProfile(authService.getCurrentUserId()).then((unTypedRes) => {
            const res = unTypedRes;
            const userProfile = res.profile;
            console.log("userProfile : ", userProfile);
            if (userProfile) {
                userProfile.nominee = userProfile.nominee.map((nominee) => {
                    delete nominee._id;
                    return nominee
                })
                setUserProfile(userProfile);
            }
        }).catch((error) => {
            console.log("error : ", error);
        })
    }, []);
    function formatDateToDdMmYyyy(inputDateString) {
        const date = new Date(inputDateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
    }
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        // if (file) {
        //     setImage(file);
        // }
        if (!file) {
            toast.error('Please select an image to upload.');
            return;
        }
        const formData = new FormData();
        formData.append('profileImage', file);

        console.log("formData : ", formData);

        const imagePromise = userService.uploadUserProfileImage(formData);
        imagePromise.then((res) => {

            var url = res.updatedProfileImage.profileImage;
            var tmp = { ...userDetail };
            console.log("imagePromise then : ", tmp);
            tmp["profileImage"] = url
            console.log("imagePromise then after : ", tmp);
            localStorage.setItem("userDetail", JSON.stringify(tmp));
            setUserDetail(tmp);
            // dispatch(setUserDetail((prevData) => ({ ...prevData, profileImage: url })));

        }).catch((error) => {
        })
        toast.promise(
            imagePromise,
            {
                loading: 'please wait while we updating your profile Image',
                success: (data) => data.message,
                error: (err) => err.toString(),
            },
            {
                style: {
                    minWidth: '250px',
                },
                success: {
                    duration: 5000,
                    icon: '🔥',
                },
                error: {
                    duration: 5000,
                    icon: '🔥',
                },
            }
        );

    };


    const [showOptions, setShowOptions] = useState(false); // State to show/hide options
    const removeImage = () => {
    };
    return (

        <div className="myscroll flex flex-col shadow-md sm:rounded-lg ">
            <h1 className='text-3xl mx-auto  font-medium text-gray-900 dark:text-white'>Profile </h1>
            <hr className='mt-2' />
            <div className='m-1 p-5 flex flex-col'>
                <div
                    className="mb-12 w-48 h-auto mt-2 mx-auto "
                    onMouseEnter={() => setShowOptions(true)}
                    onMouseLeave={() => setShowOptions(false)}
                >
                    <img className="rounded-full w-48 h-48"

                        alt="profile image"
                        src={userDetail.profileImage}
                        onError={(e) => {
                            e.target.src = defaultUserProfileImage;
                            console.log("error in image setting");
                        }}
                    />

                    <input
                        type="file"
                        id="file-input"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                    {showOptions && (
                        <div className="grid justify-items-center mt-3">
                            <label htmlFor="file-input" className="px-2 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Change Image
                            </label>

                        </div>
                    )}

                </div>
                {/* personalDetails */}
                <h3 className='mt-4 mx-auto text-xl font-medium text-gray-900 dark:text-white'>PersonalDetails</h3>
                <hr className='w-48 h-1 mx-auto bg-gray-300 border-0 rounded md:mt-2 md:mb-4 dark:bg-gray-700' />

                <div className="mt-2 grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                        <input onChange={handleInputChange} value={String(userProfile.firstName)} type="tel" name="firstName" id="firstName" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="firstName" className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First Name</label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input onChange={handleInputChange} value={String(userProfile.lastName)} type="tel" name="lastName" id="lastName" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="lastName" className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last Name</label>
                    </div>
                </div>
                <div className="mt-2 grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                        <input onChange={handleInputChange} value={formatDateToDdMmYyyy(String(userProfile.personalDetails.dateOfBirth))} type="date" name="personalDetails.dateOfBirth" id="personalDetails.dateOfBirth" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="personalDetails.dateOfBirth" className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Date of birth</label>
                    </div>

                    <div className="relative z-0 w-full mb-6 group">
                        <input onChange={handleInputChange} value={String(userProfile.personalDetails.mobileNo)} type="text" name="personalDetails.mobileNo" id="personalDetails.mobileNo" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="personalDetails.mobileNo" className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Mobile No</label>

                    </div>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                        <input onChange={handleInputChange} value={String(userProfile.personalDetails.panNumber)} type="tel" name="personalDetails.panNumber" id="personalDetails.panNumber" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="personalDetails.panNumber" className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Pan Number</label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input onChange={handleInputChange} value={String(userProfile.personalDetails.aadharNumber)} type="text" name="personalDetails.aadharNumber" id="personalDetails.aadharNumber" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="personalDetails.aadharNumber" className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Aadhar Number</label>
                    </div>
                </div>

                {/* Nominee Details */}
                <h3 className='mt-4 mx-auto text-xl font-medium text-gray-900 dark:text-white'>Nominee Details</h3>
                <hr className='w-48 h-1 mx-auto bg-gray-300 border-0 rounded md:mt-2 md:mb-4 dark:bg-gray-700' />
                <div className='block'>
                    <div className='flex flex-col'>

                        <div className='my-6 mx-10 mb-4 px-10 w-full'>
                            <div className="flex flex-row  items-center justify-between  ">
                                <div className="flex flex-col w-full px-10 ">
                                    <div className="relative z-0 w-full mb-6 group">
                                        <input
                                            onChange={handleRowDataInputChange}
                                            value={rowData.nominee.name}
                                            type="text"
                                            name="nominee.name"
                                            id="nominee.name"
                                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                            placeholder="Nominee name"
                                        />
                                    </div>
                                    <div className=" z-0 w-full mb-6 group">
                                        <input
                                            onChange={handleRowDataInputChange}
                                            value={rowData.nominee.email}
                                            type="text"
                                            name="nominee.email"
                                            id="nominee.email"
                                            className="block  p-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                            placeholder="Email of Nominee"
                                        />

                                    </div>
                                    <div className=" z-0 w-full mb-6 group">
                                        <input
                                            onChange={handleRowDataInputChange}
                                            value={rowData.nominee.relationship}
                                            type="text"
                                            name="nominee.relationship"
                                            id="nominee.relationship"
                                            className="block  p-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                            placeholder="User-Relationship"
                                        />

                                    </div>

                                </div>

                                <button
                                    onClick={handleAddnominee}
                                    className=" right-2 h-10 p-2 rounded-lg focus:bg-gray-300 text-blue-700 dark:text-blue-500 hover:text-blue-900 dark:hover:text-blue-700 focus:outline-none"
                                > Add </button>
                            </div>
                            <div className='w-full flex flex-col '>
                                {userProfile.nominee.map((nominee, index) => (
                                    <div key={index} className="text-sm text-gray-900 dark:text-white">
                                        {index + 1}) <b>Name:</b>{nominee.name}  <b>Email:</b>{nominee.email} <b>Relationship:</b>{nominee.relationship}
                                        <button
                                            onClick={() => handleRemovenominee(index)}
                                            className="ml-2 text-red-700 dark:text-red-500 hover:text-red-900 dark:hover:text-red-700 focus:outline-none"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="mt-2 grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-6 group">
                            <input onChange={handleInputChange} value={String(userProfile.firstName)} type="tel" name="firstName" id="firstName" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label htmlFor="firstName" className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First Name</label>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <input onChange={handleInputChange} value={String(userProfile.lastName)} type="tel" name="lastName" id="lastName" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label htmlFor="lastName" className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last Name</label>
                        </div>
                    </div>
                    <div className="mt-2 grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-6 group">
                            <input onChange={handleInputChange} value={formatDateToDdMmYyyy(String(userProfile.personalDetails.dateOfBirth))} type="date" name="personalDetails.dateOfBirth" id="personalDetails.dateOfBirth" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label htmlFor="personalDetails.dateOfBirth" className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Date of birth</label>
                        </div>

                        <div className="relative z-0 w-full mb-6 group">
                            <input onChange={handleInputChange} value={String(userProfile.personalDetails.mobileNo)} type="text" name="personalDetails.mobileNo" id="personalDetails.mobileNo" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label htmlFor="personalDetails.mobileNo" className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Mobile No</label>

                        </div>
                    </div> */}

                {/* address */}
                <h3 className='mt-4 mx-auto  text-xl font-medium text-gray-900 dark:text-white'>Address</h3>
                <hr className='w-48 h-1 mx-auto bg-gray-300 border-0 rounded md:mt-2 md:mb-4 dark:bg-gray-700' />
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                    <label htmlFor="address.city" value={String(userProfile.address.state)} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
                        <select onChange={handleInputChange} value={String(userProfile.address.city)} defaultValue={"-"} name='address.city' id="address.city" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            {Object.values(CityInfo).map((role, index) => (
                                <option key={index} value={role.toString()}>
                                    {role}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <label htmlFor="address.state" value={String(userProfile.address.state)} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">State</label>
                        <select onChange={handleInputChange} defaultValue={"-"} name='address.state' id="address.state" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            {Object.values(StateInfo).map((role, index) => (
                                <option key={index} value={role.toString()}>
                                    {role}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* </div> */}
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                    <label htmlFor="address.country" value={String(userProfile.address.state)} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country</label>
                       <select onChange={handleInputChange} value={String(userProfile.address.country)} defaultValue={"-"} name='address.country' id="address.country" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            {Object.values(CountryInfo).map((role, index) => (
                                <option key={index} value={role.toString()}>
                                    {role}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                    <label htmlFor="address.pincode" className="block text-sm font-medium text-gray-900 dark:text-white">Pincode Code </label>
                        <input onChange={handleInputChange} value={String(userProfile.address.pincode)} type="tel" name="address.pincode" id="address.pincode" className="block  py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                          </div>
                </div>
                {/* Other information  */}
                <h3 className='mt-4 mx-auto text-xl font-medium text-gray-900 dark:text-white'>Other information </h3>
                <hr className='w-48 h-1 mx-auto bg-gray-300 border-0 rounded md:mt-2 md:mb-4 dark:bg-gray-700' />
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="designation">Designation</label>
                        <input onChange={handleInputChange} name='designation' className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="designation" type="text" />
                        <div className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="user_avatar_help">profile picture is useful to identify your account</div>
                    </div>

                </div>
                <button type="button" onClick={handelProfileUpload} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
            </div>
        </div>

    )
}