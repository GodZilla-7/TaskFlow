import JWT from "jsonwebtoken";
import { createError } from "./error.js";

export function verify(req, res, next) {
    console.log("Received Cookies:", req.cookies);  
    const token = req.cookies?.token;
    console.log("Extracted Token:", token);  
    if (!token) {
        return next(createError(401, "Please login karo darling"));
    }

    JWT.verify(token, process.env.JWT, (err, user) => {
        if (err) {
            return next(createError(401, "Invalid Token, Please login karo darling"));
        }
        req.user = user;
        next();
    });
}
