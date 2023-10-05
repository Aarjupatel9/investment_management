const { verifyJWTToken } = require('../services/JWTservice');
const userModel = require('../models/userModel');

module.exports = (authorizedRoles) => {
    return async (req, res, next) => {
        const token = req.cookies.token;

        console.log(token);

        if (!token) {
            return res
                .status(401)
                .json({ success: false, message: "Not Authorized. Token not found !!!" });
        }

        try {
            const { _id } = verifyJWTToken(token);

            try {
                const user = await userModel.findById(_id);
                if (!user) {
                    return res
                        .status(401)
                        .json({ success: false, message: "User not found." });
                }

                if (!authorizedRoles.includes(user.role)) {
                    return res
                        .status(403)
                        .json({ success: false, message: "Insufficient permissions." });
                }

                req.user = user;
                console.log("authorized successed");
                next();
            } catch (error) {
                console.log(error);
                return res
                    .status(401)
                    .json({ success: false, message: "Not Authorized." });
            }
        } catch (error) {
            console.log(error);
            if (error.name === "JsonWebTokenError") {
                return res
                    .status(401)
                    .json({ success: false, message: "Invalid token. Not Authorized." });
            }

            if (error.name === "TokenExpiredError") {
                return res
                    .status(401)
                    .json({ success: false, message: error.name });
            }
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    };
};
