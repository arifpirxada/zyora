import dotenv from "dotenv";
dotenv.config();
import config from "./config";
import app from "./app";

import connectDatabase from "./libraries/db/db";

(async () => {
  try {
    await connectDatabase();

    app.listen(config.port, () => {
      console.info(`Server running at PORT ${config.port}`);
    });

    process.on("unhandledRejection", (reason: unknown) => {
      console.error("Unhandled Rejection:", reason);
      process.exit(1);
    });

    process.on("uncaughtException", (error: Error) => {
      console.error("Uncaught Exception: ", error);
      process.exit(1);
    });
  } catch (error) {
    console.error("Failed to connect to DB, exiting.", error);
    process.exit(1);
  }
})();
