import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import userService from '../services/userService';
import authService from '../services/authService';

const locker = {

    phoneNumber: "",
    branchName: "",
    accountNumber: "",
    IFSC: "",
    lockersize: "",
    lockernumber: "",
    lockerholder: "",
    nominee: [

    ],

    _id: "",
};


const Locker = () => {
    const [lockerDetails, setlockerDetails] = useState(locker);
    const [pageno, setpageno] = useState(0);
    const [rowData, setRowData] = useState({ nominee: { name: "", share: "" } });

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
        const sum = lockerDetails.nominee.reduce((total, nominee) => {
            return total + parseInt(nominee.share);
        }, parseInt(nominee.share));
        console.log(sum);
        if (parseInt(sum) > 100) {
            toast.error("Share can't be more than 100%");
            return;
        }



        if (nominee.name.trim() !== '') {
            setlockerDetails((prevData) => ({
                ...prevData,
                nominee: [...prevData.nominee, { name: nominee.name, share: nominee.share }],
            }));
            setRowData((prevData) => ({
                ...prevData,
                nominee: { name: "", share: "" },
            }));
        }
    };

    const handleRemovenominee = (index) => {
        const updatedExperts = [...lockerDetails.nominee];
        updatedExperts.splice(index, 1);
        setlockerDetails((prevData) => ({
            ...prevData,
            nominee: updatedExperts,
        }));
    };
    useEffect(() => { console.log("pageno=", pageno) }, [pageno])

    const handelProfileUpload = () => {
        console.log('Form Data:', lockerDetails); // You can process the data as needed
        // const { error } = bankDetailsvalidator.validate(lockerDetails);
        // if (error) {
        //     toast.error(error.toString());
        //     return;
        // }
        const profileUpdatePromise = userService.updateBankDetail(lockerDetails);
        profileUpdatePromise.then((res) => {

        })
        toast.promise(
            profileUpdatePromise,
            {
                loading: 'please wait while we updating your profile',
                success: (data) => data.message,
                error: (err) => err,
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

        setlockerDetails((data) => ({
            ...data,
            _id: authService.getCurrentUserId()
        }));
        userService.getBankDetail(authService.getCurrentUserId()).then((res) => {

            const userProfile = res.bank;
            console.log("userProfile : ", userProfile);
            if (userProfile) {
                userProfile.nominee = userProfile.nominee.map(item => {
                    // Create a copy of the object without the '_id' field
                    const { _id, ...rest } = item;
                    // Return the modified object
                    return rest;

                });
                delete userProfile.__v;
                setlockerDetails(userProfile);
            }
        }).catch((error) => {
            console.log("error : ", error);
        })
    }, []);
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        console.log("enter in handle input change");
        // If the input is nested within personalDetails or bankDetails, update accordingly
        if (name.startsWith("nominee.")) {
            const [parent, child] = name.split(".");
            setlockerDetails((prevData) => ({
                ...prevData,
                nominee: {
                    ...prevData.nominee,
                    [child]: value,
                },
            }));
        }
        else {
            console.log("handleInputChange else change : ", name)
            setlockerDetails((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const incrementpageno = () => {
        if (pageno < 1) {
            setpageno(pageno + 1);

        }
    }
    const deacrementpgeno = () => {
        if (pageno > 0) {
            setpageno(pageno - 1);
        }
    }
    return (
        <>
            <div className="mt-7 myscroll">

                <div>
                    <h3 className="mb-4 text-lg font-medium leading-none text-gray-900 dark:text-white  ml-96" >Locker Details</h3>

                    <div className="grid gap-4 mb-4 sm:grid-cols-2 ml-2">
                        <div>
                            <label htmlFor="branchName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">BranchName</label>
                            <input type="text" onChange={handleInputChange} name="branchName" id="branchName" className="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="BranchName" required="" />
                        </div>
                        <div>
                            <label htmlFor="accountNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">AccountNumber</label>
                            <input type="text" onChange={handleInputChange} name="accountNumber" id="accountNumber" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="AccountNumber" required="" />
                        </div>
                    </div>


                    <div className="grid gap-4 mb-4 sm:grid-cols-2 ml-2">
                        <div>
                            <label htmlFor="IFSC" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">IFSCode</label>
                            <input type="text" onChange={handleInputChange} name="IFSC" id="IFSC" className="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="IFSCode" required="" />
                        </div>
                        <div>
                            <label htmlFor="lockerholder" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">LockerHolderName</label>
                            <input type="text" onChange={handleInputChange} name="lockerholder" id="lockerholder" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="LockerHolder_Name" required="" />
                        </div>
                    </div>


                    <div className="grid gap-4 mb-4 sm:grid-cols-2 ml-2">
                        <div>
                            <label htmlFor="lockernumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">LockerNumber</label>
                            <input typetype="text" onChange={handleInputChange} name="lockernumber" id="lockernumber" className="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="lockernumber" required="" />
                        </div>
                        <div>
                        <label htmlFor="lockersize" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">LockerSize</label>
                        <input type="text" onChange={handleInputChange} name="lockersize" id="lockersize" class="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Lockersize" required="" />
                     </div><br/>
                    </div>
                </div>
                <div className='block'>
                    <div className='flex flex-col'>
                        <h3 className='mt-4 mx-auto  text-xl font-medium text-gray-900 dark:text-white'>nominees</h3>
                        <hr className='w-48 h-1 mx-auto bg-gray-300 border-0 rounded md:mt-2 md:mb-4 dark:bg-gray-700' />
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
                                             placeholder="Name"
                                        />
                                    </div>
                                    <div className=" z-0 w-full mb-6 group">
                                        <input
                                            onChange={handleRowDataInputChange}
                                            value={rowData.nominee.share}

                                            type="text"
                                            name="nominee.share"
                                            id="nominee.share"
                                            className="block  p-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                            placeholder="Share"
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={handleAddnominee}
                                    className=" right-2 h-10 p-2 rounded-lg focus:bg-gray-300 text-blue-700 dark:text-blue-500 hover:text-blue-900 dark:hover:text-blue-700 focus:outline-none"
                                > Add </button>
                            </div>
                            <div className='w-full flex flex-col '>
                                {lockerDetails.nominee.map((nominee, index) => (
                                    <div key={index} className="text-sm text-gray-900 dark:text-white">
                                        {index + 1}) name : {nominee.name}  share : {nominee.share}%
                                        <button
                                            onClick={() => handleRemovenominee(index)}
                                            className="ml-2 text-red-700 dark:text-red-500 hover:text-red-900 dark:hover:text-red-700 focus:outline-none"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div><br/>
                            <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload PassBook</label>
                        <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" />
                    </div>
                        </div>
                    </div>
                </div>
                <br />



            </div>
            <br />
            <div class="flex items-center justify-center">

                {/* <a onClick={deacrementpgeno} className=" px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    Previous
                </a> */}

                {/* <a onClick={incrementpageno} className=" px-3 h-8 ml-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    Next
                </a> */}

                <a onClick={handelProfileUpload} className=" px-3 h-8 ml-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    Save
                </a>
            </div>



        </>

    );
};

export default Locker;