const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(401);
            throw new Error("Please Login Again.....");
        }

        // Verify token
        const verified = jwt.verify(token, process.env.JWT_SECRET);

        // Get user id from token
        const user = await User.findById(verified.id).select("-password");

        if (!user) {
            res.status(401);
            throw new Error("User Not Found");
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401);
        throw new Error("Please Login Again.....");
    }
});

// Admin only
const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next()
    } else {
        res.status(401);
        throw new Error('You are not an Administrator');
    }
}

module.exports = {
    protect,
    adminOnly
}