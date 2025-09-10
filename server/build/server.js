"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config_1 = __importDefault(require("./config"));
const app_1 = __importDefault(require("./app"));
const db_1 = __importDefault(require("./libraries/db/db"));
(async () => {
    try {
        await (0, db_1.default)();
        app_1.default.listen(config_1.default.port, () => {
            console.info(`Server running at PORT ${config_1.default.port}`);
        });
        process.on("unhandledRejection", (reason) => {
            console.error("Unhandled Rejection:", reason);
            process.exit(1);
        });
        process.on("uncaughtException", (error) => {
            console.error("Uncaught Exception: ", error);
            process.exit(1);
        });
    }
    catch (error) {
        console.error("Failed to connect to DB, exiting.", error);
        process.exit(1);
    }
})();
