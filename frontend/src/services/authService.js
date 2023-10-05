import { loginCredentials } from "../common/Login";

const userDetailTemplate = {
  id: "id",
  name: 'name',
  email: "email",
  roll: "anonymous"
};
class AuthService {

  login(credential) {
    console.log(credential);
    return new Promise(function (resolve, reject) {
      const options = {
        method: "POST",
        credentials: "include",
        // mode: "no-cors",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Method": "GET,POST,PUT,DELETE,OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type,Authorization",
        },
        body: JSON.stringify(credential),
      };
      fetch(process.env.REACT_APP_API_SERVER + "/api/auth/login", options)
        .then((response) => {
          console.log("fetch then response :", response);
          return response.json();
        })
        .then((res) => {
          console.log("response in login arrive : ",res);
      
          if (res.success) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch((e) => {
          console.log("erre : ", e);
          reject({ success: false });
        });
    });
  }
  register(credential) {
    console.log(credential);
    return new Promise(function (resolve, reject) {
      const options = {
        method: "POST",
        // mode:"no-cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Method": "GET,POST,PUT,DELETE",
          "Access-Control-Allow-Headers": "Content-Type,Authorization",
        },
        body: JSON.stringify(credential),
      };
      fetch(process.env.REACT_APP_API_SERVER + "/api/auth/register", options)
        .then((response) => {
          console.log("fetch then response :", response);
          return response.json();
        })
        .then((res) => {
          console.log("response in register then : ", res);
          if (res.success) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch((e) => {
          console.log("response in register  error : ", e);
          reject(e);
        });
    });
  }

  logout() {
    localStorage.removeItem("userDetail");
    localStorage.clear();
  }

  getCurrentUser() {
    const localData = localStorage.getItem("userDetail");
    if (localData == null) {
      return userDetailTemplate;
    }
    return JSON.parse(localData);
  }
  getCurrentUserId() {
    const localData = localStorage.getItem("userDetail");

    if (localData == null) {
      return userDetailTemplate.id;
    }
    return JSON.parse(localData).id;

  }

}
export default new AuthService();
