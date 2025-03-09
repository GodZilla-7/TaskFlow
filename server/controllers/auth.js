import { createError } from "../utils/error.js";
import { connecttoDB } from "../utils/connect.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

// Login User
export async function login(req, res, next) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(createError(400, "Please provide email and password"));
        }

        await connecttoDB();

        const user = await User.findOne({ email });
        if (!user) {
            return next(createError(400, "Invalid credentials"));
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return next(createError(400, "Invalid credentials"));
        }

        // Generate JWT token
        const token = JWT.sign({ id: user._id }, process.env.JWT, { expiresIn: "7d" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        next(error);
    }
}

// Register User
export async function register(req, res, next) {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return next(createError(400, "Please provide username, email, and password"));
        }

        await connecttoDB();

        const alreadyUser = await User.findOne({ $or: [{ email }, { username }] });
        if (alreadyUser) {
            return next(createError(400, "Username or Email already registered"));
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const newUser = new User({ username, email, password: hash });
        await newUser.save();

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        next(error);
    }
}

// Logout User
export async function logout(req, res, next) {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        next(error);
    }
}
