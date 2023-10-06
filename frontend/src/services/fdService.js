import AuthService from "./authService";
import { handleRejectResponse } from "./systemService";

class UserService {
  getUserfdDetail(_id) {
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
        body: JSON.stringify({ _id: _id }),
      };
      fetch(
        process.env.REACT_APP_API_SERVER + "/api/fd/getfdDetail/" + _id,
        options
      )
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
  getUserfdDetails() {
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
      };
      fetch(process.env.REACT_APP_API_SERVER + "/api/fd/getfdDetails", options)
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
  AddfdDetails(data) {
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
        body: JSON.stringify(data),
      };
      fetch(process.env.REACT_APP_API_SERVER + "/api/fd/AddFdDetail", options)
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
  updatefdDetails(data) {
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
        body: JSON.stringify(data),
      };
      fetch(
        process.env.REACT_APP_API_SERVER + "/api/fd/updatefdDetail",
        options
      )
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
      fetch(
        process.env.REACT_APP_API_SERVER + "/api/system/upload-reports",
        options
      )
        .then((response) => {
          console.log(
            "uploadUserProfileImage || fetch then response :",
            response
          );
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
