"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const BaseError_1 = __importDefault(require("../../../libraries/errors/BaseError"));
const user_modal_1 = __importDefault(require("./user.modal"));
const types_1 = require("../../../types");
class UserRepository {
    async insertUser(input) {
        const newUser = new user_modal_1.default(input);
        try {
            return await newUser.save();
        }
        catch (err) {
            if (err.code === 11000) {
                throw new BaseError_1.default('DuplicateFieldError', types_1.HttpStatusCode.BAD_REQUEST, `The email: '${err.keyValue['email']}' is already in use.`);
            }
            throw new BaseError_1.default('DatabaseError', 500, 'Database error occurred. Please try again later.');
        }
    }
    async findUserByEmail(email) {
        const user = await user_modal_1.default.findOne({ email }).select('-createdAt -updatedAt -__v');
        return user;
    }
    async findUserById(_id) {
        const user = await user_modal_1.default.findOne({ _id }).select('-password -createdAt -updatedAt -__v');
        return user;
    }
}
exports.UserRepository = UserRepository;
