"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("./user.controller"));
const auth_middleware_1 = __importDefault(require("../../../middlewares/auth.middleware"));
const multer_1 = __importDefault(require("../../../libraries/multer"));
const multer_2 = __importDefault(require("multer"));
const upload = (0, multer_2.default)({
    storage: multer_1.default
});
const router = (0, express_1.Router)();
router.get('/me', auth_middleware_1.default, user_controller_1.default.getUser);
router.post('/register', upload.single('photo'), user_controller_1.default.registerUser);
router.post('/login', user_controller_1.default.loginUser);
router.post('/logout', user_controller_1.default.logoutUser);
exports.default = router;
