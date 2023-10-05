import React, { useEffect, useState } from 'react';



const Propety = () => {
    return (
        <>
            <div className="mt-7">

                <div>
                    <h3 className="mb-4 text-lg font-medium leading-none text-gray-900 dark:text-white  ml-96" >Property Details</h3>

                    <div className="grid gap-4 mb-4 sm:grid-cols-2 ml-2">
                        <div>
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                            <input type="text" name="username" id="username" className="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name" required="" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email" required="" />
                        </div>
                    </div>

                    <div className="grid gap-4 mb-4 sm:grid-cols-2 ml-2">

                        <div>
                            <label htmlFor="idNo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ID.No</label>
                            <input type="text" name="idNo" id="idNo" className="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ID.No" required="" />
                        </div>
                        <div>
                            <label htmlFor="lockeridNo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">LockerID.No</label>
                            <input type="text" name="lockeridNo" id="lockeridNo" className="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="lockerID.No" required="" />
                        </div>
                    </div>

                    <div className="grid gap-4 mb-4 sm:grid-cols-2 ml-2">

                        <div>
                            <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type</label>
                            <select id="chart" className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option selected value="Sliver">Sliver</option>
                                <option value="Gold">Gold</option>
                                <option value="Land">Land</option>
                        </select>
                        </div>
                    </div>

                    <div className="grid gap-4 mb-4 sm:grid-cols-2 ml-2">
                        <div>
                            <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                            <textarea rows={3} cols={10} name="address" id="address" class="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Address" required="" />
                        </div>
                    </div>
                    {/* <div className='block'>
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
                                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Enter an Title"
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
                                                placeholder="Upload nominee"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleAddnominee}
                                        className=" right-2 h-10 p-2 rounded-lg focus:bg-gray-300 text-blue-700 dark:text-blue-500 hover:text-blue-900 dark:hover:text-blue-700 focus:outline-none"
                                    > Add </button>
                                </div>
                                <div className='w-full flex flex-col '>
                                    {fdDetails.nominee.map((nominee, index) => (
                                        <div key={index} className="text-sm text-gray-900 dark:text-white">
                                            {index + 1}) name : {nominee.name}  share : {nominee.share}
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
                    <br />
                    <div class="flex items-center text-lg justify-center">
                        <a onClick={handelProfileUpload} className=" px-3 h-8 ml-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            Save
                        </a>
                    </div> */}
                    <br/>
                    <div class="flex items-center justify-center">
                        <a  className=" px-3 h-8 ml-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            Save
                        </a>
                    </div>

                </div>
            </div>
            <br />
        </>

    );
};

export default Propety;