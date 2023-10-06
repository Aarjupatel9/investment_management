import AuthService from "./authService";
import { handleRejectResponse } from "./systemService";

class UserService {
    getBankDetail(_id) {

        return new Promise(function (resolve, reject) {
            const options = {
                method: "POST",
                credentials: "include" ,
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Method": "GET,POST,PUT,DELETE,OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type,Authorization",
                },
                body: JSON.stringify({ _id: _id }),
            };
            fetch(process.env.REACT_APP_API_SERVER + "/api/user/getBankDetail/"+_id, options)
                .then((response) => {
                    console.log("fetch then response :", response);
                    return response.json();
                })
                .then((res) => {
                    console.log("response in getNewUserDetails arrive : ", res);
                    if (res.success) {
                        resolve(res);
                    } else {
                        handleRejectResponse(res.message);
                        reject(res.message);
                    }
                })
                .catch((e) => {
                    console.log("error : ", e);
                    reject(e);
                });
        });
    }
    getBankDetails() {

        return new Promise(function (resolve, reject) {
            const options = {
                method: "POST",
                credentials: "include" ,
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Method": "GET,POST,PUT,DELETE,OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type,Authorization",
                },
            };
            fetch(process.env.REACT_APP_API_SERVER + "/api/user/getBankDetails", options)
                .then((response) => {
                    console.log("fetch then response :", response);
                    return response.json();
                })
                .then((res) => {
                    console.log("response in getNewUserDetails arrive : ", res);
                    if (res.success) {
                        resolve(res);
                    } else {
                        handleRejectResponse(res.message);
                        reject(res.message);
                    }
                })
                .catch((e) => {
                    console.log("error : ", e);
                    reject(e);
                });
        });
    }

    EditBankAccount(id,data) {

        return new Promise(function (resolve, reject) {
            const options = {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Method": "GET,POST,PUT,DELETE,OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type,Authorization",
                },
                body: JSON.stringify(data)
            };
            fetch(process.env.REACT_APP_API_SERVER + "/api/user/updateBankDetail/"+id, options)
                .then((response) => {
                    console.log("fetch then response :", response);
                    return response.json();
                })
                .then((res) => {
                    console.log("response in updateProfile arrive : ", res);
                    handleRejectResponse(res.message);
                    if (res.success) {
                        resolve(res);
                    } else {
                        reject(res.message);
                    }
                })
                .catch((e) => {
                    console.log("error : ", e);
                    reject(e);
                });
        });


    }
    AddBankDetail(data ) {

        return new Promise(function (resolve, reject) {
            const options = {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Method": "GET,POST,PUT,DELETE,OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type,Authorization",
                },
                body: JSON.stringify(data)
            };
            fetch(process.env.REACT_APP_API_SERVER + "/api/user/AddBankDetail", options)
                .then((response) => {
                    console.log("fetch then response :", response);
                    return response.json();
                })
                .then((res) => {
                    console.log("response in updateProfile arrive : ", res);
                    handleRejectResponse(res.message);
                    if (res.success) {
                        resolve(res);
                    } else {
                        reject(res.message);
                    }
                })
                .catch((e) => {
                    console.log("error : ", e);
                    reject(e);
                });
        });


    }
    deleteBankDertail(_id) {
        return new Promise(function (resolve, reject) {

            const options = {
                method: "POST",
                credentials: "include" ,
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Method": "GET,POST,PUT,DELETE,OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type,Authorization",
                },
                body: JSON.stringify({ _id: _id })
            };
     
    
          fetch(
            process.env.REACT_APP_API_SERVER +
              "/api/user/deletebankdetails/" +
              _id,
              options
          )
            .then((response) => {
              console.log("fetch then response :", response);
              if (response.status === 404) {
                reject("path not found");
              }
              return response.json();
            })
            .then((res) => {
              console.log("response in getNewUserDetails arrive : ", res);
              if (res.success) {
                resolve(res);
              } else {
                handleRejectResponse(res.message);
                if (typeof res.message == String) {
                  reject(res.message);
                } else {
                  reject("server error");
                }
              }
            })
            .catch((e) => {
              console.log("error : ", e);
              reject(e.toString());
            });
        });
    }


  
    uploadReportOfEvent(formData) {

        return new Promise(function (resolve, reject) {
            const options = {
                method: "POST",
                credentials: "include",
                headers: {
                    // "Content-Type": "multipart/form-data",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Method": "GET,POST,PUT,DELETE,OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type,Authorization",
                },
                body: formData,
            };
            fetch(process.env.REACT_APP_API_SERVER + "/api/system/upload-reports", options)
                .then((response) => {
                    console.log("uploadUserProfileImage || fetch then response :", response);
                    return response.json();
                })
                .then((res) => {
                    console.log("uploadUserProfileImage ||response in arrive : ", res);
                    if (res.success) {
                        resolve(res);
                    } else {
                        handleRejectResponse(res.message);
                        reject(res.message);
                    }
                })
                .catch((e) => {
                    console.log("error : ", e);
                    reject(e);
                });
        });
    }
}

export default new UserService();
