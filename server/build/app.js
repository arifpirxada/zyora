"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const errorHandler_1 = require("./libraries/errors/errorHandler");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
// Route imports
const users_1 = require("./apps/users");
const products_1 = require("./apps/products");
const app = (0, express_1.default)();
// Middlewares
app.use(express_1.default.static(path_1.default.join(__dirname, "../../client/dist"), { maxAge: "1d" }));
app.use("/api/uploads", express_1.default.static("uploads"));
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// app.get("/", (request: Request, res: Response) => {
//   res.send("Server Running");
// });
// Routers
app.use("/api/auth", users_1.userRouter);
app.use("/api/products", products_1.productRouter);
app.get("/{*any}", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../../client/dist", "index.html"));
});
// Global error middleware
app.use(errorHandler_1.handleError);
exports.default = app;
