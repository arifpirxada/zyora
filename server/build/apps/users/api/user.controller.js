"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = require("../domain/user.service");
const types_1 = require("../../../types");
const userService = new user_service_1.UserService();
const getUser = async (req, res, next) => {
    try {
        const user = await userService.getUser(req.userId);
        res.status(types_1.HttpStatusCode.OK).json({
            success: true,
            message: 'User fetched successfully',
            user,
        });
    }
    catch (err) {
        next(err);
    }
};
const registerUser = async (req, res, next) => {
    try {
        let userData = req.body;
        if (req.file) {
            userData.profilePic = `uploads/${req.file.filename}`;
        }
        else {
            userData.profilePic = `uploads/default.jpg`;
        }
        const user = await userService.createUser(userData);
        res.cookie('access_token', user.token, {
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        });
        res.status(types_1.HttpStatusCode.CREATED).json({
            success: true,
            message: 'Insertion successful',
        });
    }
    catch (error) {
        next(error);
    }
};
const loginUser = async (req, res, next) => {
    try {
        const user = await userService.loginUser(req.body);
        res.cookie('access_token', user.token, {
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        });
        res.status(types_1.HttpStatusCode.OK).json({
            success: true,
            message: 'Login successful',
        });
    }
    catch (error) {
        next(error);
    }
};
const logoutUser = (req, res, next) => {
    try {
        res.clearCookie('access_token');
        res.status(types_1.HttpStatusCode.OK).json({
            success: true,
            message: 'Logout successful',
        });
    }
    catch (error) {
        next(error);
    }
};
exports.default = { getUser, registerUser, loginUser, logoutUser };
