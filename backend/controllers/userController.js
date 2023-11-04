const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    })
}

// Register user
const registerUser = asyncHandler(async (req, res) => {
    // First desructer 
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please fill all details");
    }
    if (password.length < 6) {
        res.status(400);
        throw new Error("Password length should be more then 6 character");
    }

    // Check user exist or not
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User already exist");
    }

    // Create new user
    const user = await User.create({
        name,
        email,
        password
    });

    // Generate Token
    const token = generateToken(user._id);

    if (user) {

        const { _id, name, email, role } = user;

        res.cookie("token", token, {
            path: "/",
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400),
            // secure: true,
            // sameSite: none
        })

        // Send user data
        res.status(201).json({
            _id, name, email, role, token
        });
    } else {
        res.status(400);
        throw new Error("Invalid User Data");
    }
});

// Login User 
const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    // Validate user request
    if (!email || !password) {
        res.status(400);
        throw new Error('Please provide an Email and Password');
    }

    // Check User exist
    const user = await User.findOne({ email });
    if (!user) {
        res.status(400);
        throw new Error("User does not exist");
    }

    // User exist then check if password is correct
    const passowrdIsCorrect = await bcrypt.compare(password, user.password);

    // Generate token
    const token = generateToken(user._id);

    if (user && passowrdIsCorrect) {

        const newUser = await User.findOne({ email }).select("-password");

        res.cookie("token", token, {
            path: "/",
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400),
            // secure: true,
            // sameSite: none
        });

        // Send user data
        res.status(201).json(newUser);
    } else {
        res.status(400);
        throw new Error("Invalid email or password");
    }
});

// Logout User
const logOutUser = asyncHandler(async (req, res) => {
    // Set cookie
    res.cookie("token", "", {
        path: "/",
        httpOnly: true, // cookie is accessible only through HTTP requests
        expires: new Date(0),
        // secure: true,
        // sameSite: none
    });
    return res.status(200).json({ message: "User Logout" });
});



// Get User Data
const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select("-password");
    console.log(user);
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(400);
        throw new Error("User not found");
    }
});

// Get login status
const getLoginStatus = asyncHandler(async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(false);
    }

    // Verify token
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    if (verified) {
        res.status(true);
    } else {
        res.status(false);
    }
});

// Update user

const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        const { name, phone, address } = user;

        // Edit field based on request body
        // If user update only one field and send other field without update then send previous data
        user.name = req.body.name || name;
        user.phone = req.body.phone || phone;
        user.address = req.body.address || address;

        // save update data in database
        const updatedUser = await user.save();
        // Send updated user into frontend
        res.json(200).json(updatedUser);

    } else {
        res.status(404);
        throw new Error("User not found");
    }
});


module.exports = {
    registerUser,
    loginUser,
    logOutUser,
    getUser,
    getLoginStatus,
    updateUser
}