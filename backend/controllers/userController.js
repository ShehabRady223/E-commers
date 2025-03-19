import userModel from './../models/userModel.js';
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

function createToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

export async function loginUser(req, res) {
    try {
        const { password, email } = req.body
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: "User dosen't exists" })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) {
            const token = createToken(user._id)
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: "Invalid credentials" })
        }
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, msg: error.message })
    }
}

export async function registerUser(req, res) {
    try {
        const { name, email, password } = req.body
        const exists = await userModel.findOne({ email })
        if (exists) {
            return res.json({ success: false, message: 'User alrady exists' })
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: 'Please enter a valid email' })
        }
        if (password.length < 5) {
            return res.json({ success: false, message: 'Please enter a strong password' })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })
        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({ success: true, token })
    } catch (error) {
        console.log(error);
        res.json({ success: false, msg: error.message })
    }
}

export async function adminLogin(req, res) {
    try {
        const { password, email } = req.body
        if (password === process.env.ADMIN_PASSWORD && email === process.env.ADMIN_EMAIL) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: 'Invalid credentials' })
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, msg: error.message })
    }
}
