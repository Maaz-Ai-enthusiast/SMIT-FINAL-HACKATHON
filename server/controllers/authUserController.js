import UserSignup from "../models/userSignupModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const userSignup = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    // Check if all fields are provided
    if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({ error: "All fields are required" });
    }

    // Check if the password and confirmPassword match
    if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match" });
    }

    try {
        // Check if user already exists
        const existingUser = await UserSignup.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Hash the password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create and save the user
        const user = await UserSignup.create({ name, email, password: hashPassword });
        await user.save();

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        // Set the token in cookies
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production" ? true : false,
            sameSite: process.env.NODE_ENV === "production" ? "none" : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        return res.json({
            success: true,
            message: "User created successfully",
            token: token
        });

    } catch (error) {
        res.status(500).json({
            error: "Server error",
            success: false,
            message: error.message || error
        });
    }
};



export const userLogin = async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({error: "All fields are required"})
    }

    try {
        const user = await UserSignup.findOne({email});

        if(!user){
            return res.status(400).json({error: "User does not exist"})
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({error: "Invalid credentials"})
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "7d"});

        res.cookie(
            "token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production" ? true : false,
                sameSite: process.env.NODE_ENV === "production" ? "none" : 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000
            }
        );

        return res.json({
            success: true,
            message: "User logged in successfully",
            token: token
        })

    } catch (error) {
        res.status(500).json({
            error: "Server error",
            success: false,
            message: error.message || error
        })
    }

}

export const userLogout = async (req, res) => {
    res.clearCookie("token");
    return res.json({
        success: true,
        message: "User logged out successfully"

    })
}