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
            fetch(process.env.REACT_APP_API_SERVER + "/api/user/getBankDetail", options)
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

    updateBankDetail(data ) {

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
            fetch(process.env.REACT_APP_API_SERVER + "/api/user/updateBankDetail", options)
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

    getUserfdDetails(_id) {

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
            fetch(process.env.REACT_APP_API_SERVER + "/api/user/getfdDetail", options)
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

    updatefdDetails(data ) {

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
            fetch(process.env.REACT_APP_API_SERVER + "/api/user/updatefdDetail", options)
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
    updateProfile(data ) {

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
                body: JSON.stringify(data)
            };
            fetch(process.env.REACT_APP_API_SERVER + "/api/profile/updateProfile", options)
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

    getUserProfile(_id) {

        // return new Promise(function (resolve, reject) {
        //     const options = {
        //         method: "POST",
        //         credentials: "include" ,
        //         headers: {
        //             "Content-Type": "application/json;charset=UTF-8",
        //             "Access-Control-Allow-Origin": "*",
        //             "Access-Control-Allow-Method": "GET,POST,PUT,DELETE,OPTIONS",
        //             "Access-Control-Allow-Headers": "Content-Type,Authorization",
        //         },
        //         body: JSON.stringify({ _id: _id }),
        //     };
        //     fetch(process.env.REACT_APP_API_SERVER + "/api/profile/getProfile", options)
        //         .then((response) => {
        //             console.log("fetch then response :", response);
        //             return response.json();
        //         })
        //         .then((res) => {
        //             console.log("response in getNewUserDetails arrive : ", res);
        //             if (res.success) {
        //                 resolve(res);
        //             } else {
        //                 handleRejectResponse(res.message);
        //                 reject(res.message);
        //             }
        //         })
        //         .catch((e) => {
        //             console.log("error : ", e);
        //             reject(e);
        //         });
        // });

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
            fetch(process.env.REACT_APP_API_SERVER + "/api/profile/getProfile", options)
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
    uploadUserProfileImage(formData) {

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
            fetch(process.env.REACT_APP_API_SERVER + "/api/profile/upload-Profile-Image", options)
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
