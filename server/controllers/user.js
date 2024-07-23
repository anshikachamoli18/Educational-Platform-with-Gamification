import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendMail from "../middleware/sendMail.js";
import TryCatch from "../middleware/TryCatch.js";

export const register = TryCatch(async (req, res) => {
    const { email, password, name } = req.body;
    let user = await User.findOne({ email });

    if (user) {
        return res.status(400).json({ message: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    user = {
        name,
        email,
        password: hashPassword
    };

    const otp = Math.floor(Math.random() * 1000000);
    const activationToken = jwt.sign({ user, otp }, process.env.Activation_Secret, { expiresIn: "20m" });

    const data = { name, otp };

    await sendMail(email, "E Learning", data);

    res.status(200).json({ message: "OTP sent to your email address", activationToken });
});

export const verifyUser = TryCatch(async (req, res) => {
    const { activationToken, otp } = req.body;
    const verify = jwt.verify(activationToken, process.env.Activation_Secret);
    if (!verify) {
        return res.status(400).json({ message: "OTP expired" });
    }
    if (verify.otp !== otp) {
        return res.status(400).json({ message: "Invalid OTP" });
    }
    await User.create({
        name: verify.user.name,
        email: verify.user.email,
        password: verify.user.password
    });
    res.status(200).json({ message: "User registered successfully" });
});

export const loginUser = TryCatch(async (req, res) => {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
        return res.status(400).json({ message: "Wrong Password" });
    }
    const token = await jwt.sign({ _id: user._id }, process.env.Jwt_Sec, { expiresIn: "15d" });
    res.json({ message: `Welcome back ${user.name}`, token, user });
});

export const myProfile = TryCatch(async (req, res) => {
    const user = await User.findById(req.user._id);
    res.json({ user });
});
