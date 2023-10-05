import React, { useEffect, useState, useContext } from "react";
// import './Signuppage.css';
import AppContext from "../context/AppContext";
import authService from "../services/authService";
import toast from "react-hot-toast";


const Signup = () => {

    const { roll, setRoll, userDetail, setUserDetail } = useContext(AppContext);

    const [localUserDetail, setLocalUserDetail] = useState({
        id: "id",
        name: 'name',
        email: "email",
        roll: "register"
    });

    useEffect(() => {
        console.log("localUserDetail changed");
    }, [localUserDetail])

    useEffect(() => {
        console.log("email useEffect userDetail : ", userDetail);
        setUserDetail(localUserDetail);
    }, [userDetail])


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAdress] = useState("");
    const [pass, setPass] = useState("");
    const [confirmpass, setConfimpass] = useState("");


    function Register() {
        if (name == "") {
            toast.error("name is required");
            return;
        }
        if (phone.length != 10) {
            toast.error("phone is required");
            return;
        }
        if (email == "") {
            toast.error("email is required");
            return;
        }
        if (pass.length < 6) {
            toast.error("password have to minimum 6 char");
            return;
        }
        if (pass != confirmpass) {
            toast.error("pass should be same");
            return;
        }

        var cred = {
            name: name,
            email: email,
            phone: phone,
            address: address,
            pass: pass,
            confirmpass: confirmpass
        }
        authService.register(cred).then((response) => {
            console.log("signup  || response : ", response);
            toast.success(response.message);
            loginRedirect();
        }).catch((err) => {
            console.log("signup  || err : ", err);
            toast.error(err.message);
        })
    }
    function loginRedirect() {
        setRoll("anonymous");
    }

    return (
        <div className="signup flex justify-center items-center">

            <div className="w-full mt-10 max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <form className="space-y-6" action="#">
                    <h5 className="text-xl font-medium text-gray-900 dark:text-white">Registration</h5>
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                        <input type="name" name="name" value={name} onChange={(e) => { setName(e.target.value) }} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter your name" required />
                    </div>

                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
                        <input type="email" name="email" value={email} onChange={(e) => { setEmail(e.target.value) }} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter your email" required />
                    </div>

                    <div>
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Contact_no.</label>
                        <input type="phone" name="phone" value={phone} onChange={(e) => { setPhone(e.target.value) }} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter your contact" required />
                    </div>

                    <div>
                        <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Address.</label>
                        <textarea rows="2" cols="10" name="address" value={address} onChange={(e) => { setAdress(e.target.value) }} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter your address" required />
                    </div>

                    <div>
                        <label htmlFor="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Password</label>
                        <input type="password" name="password" value={pass} onChange={(e) => { setPass(e.target.value) }} id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                    </div>

                    <div>
                        <label htmlFor="confirmpass" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your confirm_password</label>
                        <input type="confirmpass" name="confirmpass" value={confirmpass} onChange={(e) => { setConfimpass(e.target.value) }} id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                    </div>

                    <button type="button" onClick={() => { Register(); }} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register</button>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Already registered? <a onClick={() => { loginRedirect(); }} className="text-blue-700 hover:underline dark:text-blue-500">Login</a>
                    </div>
                </form>
            </div>


        </div>
    )
}
export default Signup;