import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import lockerService from "../services/lockerService";
import authService from "../services/authService";
import { useParams } from "react-router-dom";
import { licValidator } from "../validator/licValidator";
import { formatDateToDdMmYyyy } from "../utils/functions";
import { lockerValidator } from "../validator/lockerValidator";

const fdData = {
  branchName: "",
  accountNumber: "",
  lockerHolder: "",
  lockerSize: "",
  lockerNumber: "",
  IFSCCode: "",
  nominee: [],
  document:[]
};

const EditLocker = () => {
  const [lockerDetails, setLockerDetails] = useState(fdData);
  const [rowData, setRowData] = useState({
    experts: "",
    nominee: { name: "", share: "" },
    report: { url: "" },
  });
  const [reports, setReports] = useState([]);
  const [reportFormData, setReportFormData] = useState(null);
  const { id } = useParams();

  const handelProfileUpload = () => {
    console.log("Form Data:", lockerDetails); // You can process the data as needed
    var values = lockerDetails;
    values.document = reports;
    const { _id, __v, userId, ...data } = values;
    console.log("data : ", data);
    const { error } = lockerValidator.validate(data);
    if (error) {
      toast.error(error.toString());
      return;
    }
    if (id) {
      const qualificationPromise = lockerService.updateLockerDetails(_id, data);
      toast.promise(
        qualificationPromise,
        {
          loading: "please wait while adding Locker data",
          success: (data) => data.message,
          error: (err) => err,
        },
        {
          style: {
            minWidth: "250px",
          },
          success: {
            duration: 2000,
            icon: "🔥",
          },
          error: {
            duration: 2000,
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
      const qualificationPromise = lockerService.AddLockerDetails(data);
      toast.promise(
        qualificationPromise,
        {
          loading: "please wait while adding Locker data",
          success: (data) => data.message,
          error: (err) => err,
        },
        {
          style: {
            minWidth: "250px",
          },
          success: {
            duration: 2000,
            icon: "🔥",
          },
          error: {
            duration: 2000,
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
      lockerService
        .getUserLockerDetail(id)
        .then((res) => {
          const userProfile = res.Locker;
          console.log("userProfile : ", userProfile);
          if (userProfile) {
            userProfile.nominee = userProfile.nominee.map((item) => {
              const { _id, ...rest } = item;
              return rest;
            });
            userProfile.document = userProfile.document.map((item) => {
              const { _id, ...rest } = item;
              return rest;
            });
          



            setLockerDetails(userProfile);
            setReports(userProfile.document);
          }
        })
        .catch((error) => {
          console.log("error : ", error);
        });
    }
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name.startsWith("nominee.")) {
      const [parent, child] = name.split(".");
      setLockerDetails((prevData) => ({
        ...prevData,
        nominee: {
          ...prevData.nominee,
          [child]: value,
        },
      }));
    } else {
      console.log("handleInputChange else change : ", name);
      setLockerDetails((prevData) => ({
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
      const reportPromise = lockerService.uploadReportOfEvent(reportFormData);
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

    if (nominee.name.trim() !== "") {
      setLockerDetails((prevData) => ({
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
    const updatedExperts = [...lockerDetails.nominee];
    updatedExperts.splice(index, 1);
    setLockerDetails((prevData) => ({
      ...prevData,
      nominee: updatedExperts,
    }));
  };

  return (
    <div className="mt-7 p-10 myscroll">
      <div>
        <h3 className="mb-4 text-xl text-gray-900 dark:text-white  mx-auto">
          Locker
        </h3>

        {/* branchName */}
        <div className="grid gap-4 mb-4 sm:grid-cols-2 ml-2">
          <div>
            <label
              htmlFor="branchName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              branchName
            </label>
            <input
              type="text"
              value={lockerDetails.branchName}
              onChange={handleInputChange}
              name="branchName"
              id="branchName"
              className="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="branchName"
              required=""
            />
          </div>
          <div>
            <label
              htmlFor="accountNumber"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              accountNumber
            </label>
            <input
              type="text"
              value={lockerDetails.accountNumber}
              onChange={handleInputChange}
              name="accountNumber"
              id="accountNumber"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="accountNumber"
              required=""
            />
          </div>
        </div>

        {/* amount */}
        <div className="grid gap-4 mb-4 sm:grid-cols-2 ml-2">
          <div>
            <label
              htmlFor="lockerHolder"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              locker holder name
            </label>
            <input
              type="text"
              value={lockerDetails.lockerHolder}
              onChange={handleInputChange}
              name="lockerHolder"
              id="lockerHolder"
              className="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="lockerHolder"
              required=""
            />
          </div>
          <div>
            <label
              htmlFor="lockerSize"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              locker size
            </label>
            <input
              type="text"
              value={lockerDetails.lockerSize}
              onChange={handleInputChange}
              name="lockerSize"
              id="lockerSize"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="lockerSize"
              required=""
            />
          </div>
        </div>
        {/* date   */}
        <div className="grid gap-4 mb-4 sm:grid-cols-2 ml-2">
          <div>
            <label
              htmlFor="lockerNumber"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              lockerNumber
            </label>
            <input
              type="text"
              value={lockerDetails.lockerNumber}
              onChange={handleInputChange}
              name="lockerNumber"
              id="lockerNumber"
              className="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="lockerNumber"
              required=""
            />
          </div>
          <div>
            <label
              htmlFor="IFSCCode"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
            IFSC Code
            </label>
            <input
              type="text"
              value={lockerDetails.IFSCCode}
              onChange={handleInputChange}
              name="IFSCCode"
              id="IFSCCode"
              className="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="IFSC Code"
              required=""
            />
          </div>
        </div>
     

        {/* nominee   */}

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
                {lockerDetails.nominee.map((nominee, index) => (
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

        {/* document */}
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
                    {index + 1} ) Documents
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
  );
};

export default EditLocker;
