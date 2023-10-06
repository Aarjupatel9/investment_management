import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { fdDetailsvalidator } from "../validator/Validator";
import fdService from "../services/fdService";
import authService from "../services/authService";
import { useParams } from "react-router-dom";

const fdData = {
  idNo: "",
  bankName: "",
  email: "",
  name: "",
  depositeAccount: "",
  year: "",
  matuiryDate: "",
  nominee: [
    // {
    //     name: "",
    //     share: "",
    // },
  ],
  _id: "",
};

const EditFd = () => {
  const [fdDetails, setfdDetails] = useState(fdData);
  const [pageno, setpageno] = useState(0);
  const [rowData, setRowData] = useState({
    experts: "",
    nominee: { name: "", share: "" },
    report: { url: "" },
  });
  const [reports, setReports] = useState([]);
  const [reportFormData, setReportFormData] = useState(null);
  const { id } = useParams();

  const handleAddnominee = () => {
    const nominee = rowData.nominee;
    // for 100% share
    const sum = fdDetails.nominee.reduce((total, nominee) => {
      return total + parseInt(nominee.share);
    }, parseInt(nominee.share));
    console.log(sum);
    if (parseInt(sum) > 100) {
      toast.error("Share can't be more than 100%");
      return;
    }

    if (nominee.name.trim() !== "") {
      setfdDetails((prevData) => ({
        ...prevData,
        nominee: [
          ...prevData.nominee,
          { name: nominee.name, share: nominee.share },
        ],
      }));
      setRowData((prevData) => ({
        ...prevData,
        nominee: { name: "", share: "" },
      }));
    }
  };

  const handleRemovenominee = (index) => {
    const updatedExperts = [...fdDetails.nominee];
    updatedExperts.splice(index, 1);
    setfdDetails((prevData) => ({
      ...prevData,
      nominee: updatedExperts,
    }));
  };

  const handelProfileUpload = () => {
    console.log("Form Data:", fdDetails); // You can process the data as needed
    var values = fdDetails;
    values.document = reports;
    const { _id, __v, userId, ...data } = values;
    console.log("Values: ", values);
    const { error } = fdDetailsvalidator.validate(data);
    if (error) {
      toast.error(error.toString());
      return;
    }

    // const profileUpdatePromise = fdService.updatefdDetails(data);
    // profileUpdatePromise.then((res) => {});
    // toast.promise(
    //   profileUpdatePromise,
    //   {
    //     loading: "please wait while we updating your profile",
    //     success: (data) => data.message,
    //     error: (err) => err,
    //   },
    //   {
    //     style: {
    //       minWidth: "250px",
    //     },
    //     success: {
    //       duration: 5000,
    //       icon: "🔥",
    //     },
    //     error: {
    //       duration: 5000,
    //       icon: "🔥",
    //     },
    //   }
    // );

    if (id) {
      const qualificationPromise = fdService.updatefdDetails(_id, data);
      toast.promise(
        qualificationPromise,
        {
          loading: "please wait while adding qualification data",
          success: (data) => data.message,
          error: (err) => err,
        },
        {
          style: {
            minWidth: "250px",
          },
          success: {
            duration: 5000,
            icon: "🔥",
          },
          error: {
            duration: 5000,
            icon: "🔥",
          },
        }
      );
      qualificationPromise
        .then((res) => {
          console.log("res: ", res);
        })
        .catch((error) => {});
    } else {
      const qualificationPromise = fdService.AddfdDetails(data);
      toast.promise(
        qualificationPromise,
        {
          loading: "please wait while adding qualification data",
          success: (data) => data.message,
          error: (err) => err,
        },
        {
          style: {
            minWidth: "250px",
          },
          success: {
            duration: 5000,
            icon: "🔥",
          },
          error: {
            duration: 5000,
            icon: "🔥",
          },
        }
      );
      qualificationPromise
        .then((res) => {
          console.log("res: ", res);
        })
        .catch((error) => {});
    }
  };
  useEffect(() => {

    if (id != undefined) {
      fdService
        .getUserfdDetail(authService.getCurrentUserId())
        .then((res) => {
          const userProfile = res.bank;
          console.log("userProfile : ", userProfile);
          if (userProfile) {
            userProfile.nominee = userProfile.nominee.map((item) => {
              const { _id, ...rest } = item;
              return rest;
            });
            delete userProfile.__v;
            setfdDetails(userProfile);
            setReports(userProfile.documents);
          }
        })
        .catch((error) => {
          console.log("error : ", error);
        });
    }
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log("enter in handle input change");
    // If the input is nested within personalDetails or bankDetails, update accordingly
    if (name.startsWith("nominee.")) {
      const [parent, child] = name.split(".");
      setfdDetails((prevData) => ({
        ...prevData,
        nominee: {
          ...prevData.nominee,
          [child]: value,
        },
      }));
    } else {
      console.log("handleInputChange else change : ", name);
      setfdDetails((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

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
    } else if (name.startsWith("report.")) {
      const [parent, child] = name.split(".");
      if (child == "url") {
        const file = event.target.files[0];
        if (!file) {
          toast.error("Please select an image to upload.");
          return;
        }
        const formData = new FormData();
        formData.append("reports", file);
        setReportFormData(formData);
      }
      setRowData((prevData) => ({
        ...prevData,
        report: {
          ...prevData.report,
          [child]: value,
        },
      }));
    } else {
      setRowData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleAddReport = () => {
    const report = rowData.report;
    if (report.url.trim() !== "") {
      if (!reportFormData) {
        toast.error("please select report file ");
        return;
      }

      console.log("reportFormData : ", reportFormData);
      const reportPromise = fdService.uploadReportOfEvent(reportFormData);
      reportPromise
        .then((res) => {
          console.log("report upload response : ", res.uploadedFiles);
          setReports((prevData) => [
            ...prevData,
            { url: res.uploadedFiles[0] },
          ]);
          setRowData((prevData) => ({
            ...prevData,
            report: { url: "" },
          }));
          setReportFormData(null);
        })
        .catch((error) => {
          // setReportFormData(null);
        });
    }
  };
  const handleRemoveReport = (index) => {
    const updatedReports = [...reports];
    updatedReports.splice(index, 1);
    setReports(updatedReports);
  };
  return (
    <>
      <div className="mt-7 p-10 myscroll">
        <div>
          <h3 className="mb-4 text-lg font-medium leading-none text-gray-900 dark:text-white  ml-96">
            Fixed Deposite{" "}
          </h3>

          <div className="grid gap-4 mb-4 sm:grid-cols-2 ml-2">
            <div>
              <label
                htmlFor="idNo"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                ID.No
              </label>
              <input
                type="text"
                value={fdDetails.idNo}
                onChange={handleInputChange}
                name="idNo"
                id="idNo"
                className="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="ID.No"
                required=""
              />
            </div>
            <div>
              <label
                htmlFor="bankName"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                BankName
              </label>
              <input
                type="text"
                value={fdDetails.bankName}
                onChange={handleInputChange}
                name="bankName"
                id="bankName"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="BankName"
                required=""
              />
            </div>
          </div>

          <div className="grid gap-4 mb-4 sm:grid-cols-2 ml-2">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="text"
                value={fdDetails.email}
                onChange={handleInputChange}
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Email"
                required=""
              />
            </div>
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Name
              </label>
              <input
                type="text"
                value={fdDetails.name}
                onChange={handleInputChange}
                name="name"
                id="name"
                className="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Name"
                required=""
              />
            </div>
          </div>

          <div className="grid gap-4 mb-4 sm:grid-cols-2 ml-2">
            <div>
              <label
                htmlFor="depositeAccount"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Deposite Amount
              </label>
              <input
                type="text"
                value={fdDetails.depositeAccount}
                onChange={handleInputChange}
                name="depositeAccount"
                id="depositeAccount"
                className="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Deposite Amount"
                required=""
              />
            </div>
            <div>
              <label
                htmlFor="year"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Year
              </label>
              <input
                type="text"
                value={fdDetails.year}
                onChange={handleInputChange}
                name="year"
                id="year"
                className="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Year"
                required=""
              />
            </div>
          </div>
          <div className="grid gap-4 mb-4 sm:grid-cols-2 ml-2">
            <div>
              <label
                htmlFor="matuiryDate"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Matuirty Date
              </label>
              <input
                type="date"
                value={fdDetails.matuiryDate}
                onChange={handleInputChange}
                name="matuiryDate"
                id="matuiryDate"
                className="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Matuirty Date"
                required=""
              />
            </div>
          </div>

          <div className="block">
            <div className="flex flex-col">
              <h3 className="mt-4 mx-auto  text-xl font-medium text-gray-900 dark:text-white">
                nominees
              </h3>
              <hr className="w-48 h-1 mx-auto bg-gray-300 border-0 rounded md:mt-2 md:mb-4 dark:bg-gray-700" />
              <div className="my-6 mx-10 mb-4 px-10 w-full">
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
                        placeholder="Nominee Name"
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
                  >
                    {" "}
                    Add{" "}
                  </button>
                </div>
                <div className="w-full flex flex-col ">
                  {fdDetails.nominee.map((nominee, index) => (
                    <div
                      key={index}
                      className="text-sm text-gray-900 dark:text-white"
                    >
                      {index + 1}) name : {nominee.name} share : {nominee.share}
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

          {/* certificates */}
          <div className="flex flex-col">
            <h3 className="mt-4 mx-auto  text-xl font-bold text-gray-900 dark:text-white">
              Documents
            </h3>
            <hr className="w-48 h-1 mx-auto bg-gray-300 border-0 rounded md:mt-2 md:mb-4 dark:bg-gray-700" />
            <div className="my-6 mx-10 mb-4 px-10 w-full">
              <div className="flex flex-row  items-center justify-between  ">
                <div className="flex flex-col w-full px-10 ">
                  <div className=" z-0 w-full mb-6 group">
                    <input
                      onChange={handleRowDataInputChange}
                      value={rowData.report.url}
                      type="file"
                      name="report.url"
                      id="report.url"
                      className="block  p-0 w-full text-sm text-gray-900 bg-transparent border-0 border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-500 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder="Upload report"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAddReport}
                  className=" right-2 h-10 p-2 rounded-lg focus:bg-gray-300 text-blue-700 dark:text-blue-500 hover:text-blue-900 dark:hover:text-blue-700 focus:outline-none"
                >
                  Add
                </button>
              </div>
              <div className="w-full flex flex-col ">
                {reports.map((report, index) => (
                  <div
                    key={index}
                    className="text-medium text-gray-900 dark:text-white"
                  >
                    <a
                      className=" border-blue-500 hover:border-b-2  "
                      target="_blank"
                      href={report.url}
                    >
                      Passbook
                    </a>
                    <button
                      onClick={() => handleRemoveReport(index)}
                      className="ml-10 text-red-700 dark:text-red-500 hover:text-red-900 dark:hover:text-red-700 focus:outline-none"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <br />
          <div className="flex items-center text-lg justify-center">
            <a
              onClick={handelProfileUpload}
              className=" px-3 h-8 ml-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Save
            </a>
          </div>
          <br />
        </div>
      </div>
    </>
  );
};

export default EditFd;
