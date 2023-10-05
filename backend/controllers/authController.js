const User = require("../models/userModel");
const profileModel = require("../models/profileModel");
const { genJWTToken } = require("../services/JWTservice");
const { userLoginValidator, userSignupValidator } = require("../validators/authValidator");
const { hashPassword, compareHash } = require("../services/hashPassword");


const ejs = require("ejs");
const fs = require("fs");
const path = require("path");

const CookieOptions = {
    expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    secure: true,
    httpOnly: true,
    sameSite: "none"
};

const hostName = process.env.HOST;


exports.Login = async (req, res) => {
    try {
        const { error } = userLoginValidator.validate(req.body);

        if (error) {
            return res
                .status(400)
                .json({ success: false, message: error.details[0].message });
        }

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: "User does not exist." });
        }

        if (!user.isEmailVerified) {
            return res.status(400).json({ success: false, message: "Email not verified !!!" });
        }

        const isMatch = await compareHash(password, user.password);

        if (isMatch) {
            const payload = {
                _id: user._id,
                email: user.email,
                role: user.role
            };
            

            // Sign token
            const token = genJWTToken(payload);
            const userProfile = await profileModel.findById(user._id);
        console.log("login success ",userProfile);    
            const { password, ...userData } = user.toObject();

           
            res.status(200).
                cookie("token", token, CookieOptions).
                json({
                    success: true,
                    message: "logged in successfully",
                    user: userData,
                    userProfile: userProfile
                });
                var dead=Date.now(); 
                user.lastLoginTime=dead;
                user.save();

        } else {
            return res
                .status(400)
                .json({ success: false, message: "Invalid Credentials !!!" });
        }

    } catch (error) {

        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });

    }
}

exports.Register = async (req, res) => {
    try {
        console.log("regiter requiest arrive ", req.body);
        const { error } = userSignupValidator.validate(req.body);

        if (error) {
            return res
                .status(400)
                .json({ success: false, message: error.details[0].message });
        }

        const { name, email, phone, address, pass, confirmpass } = req.body;
        if (pass != confirmpass) {
            return res
                .status(400)
                .json({ success: false, message: "both password must be same" });
        }

        const user = await User.findOne({ email: email });

        if (user) {
            return res.
                status(400).
                json({ success: false, message: "Email already exists" });

        } else {

            const hash = await hashPassword(pass);

            const newUser = new User({
                name: name,
                email: email,
                password: hash,
                address: address,
                phone: phone
            });

            const payload = {
                _id: newUser._id,
                email: newUser.email,
                role: newUser.role
            };



            await newUser.save();

            const { password, ...user } = newUser.toObject();

            res.status(200).
                json({
                    success: true,
                    message: "Registered in successfully",
                    user: user
                });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });

    }
}

exports.LogOut = async (req, res) => {
    try {
        console.log("here in logout");
        res.clearCookie("token");
        res.status(200).send({ success: "true", message: "Successfully Logged Out" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error." });
    }
}
