// index.js
import dotenv from "dotenv";
dotenv.config();

import app from "./main.js";
import connectDB from "./configs/database/db.config.js";

const PORT = process.env.PORT;

// Connect to DB first, then start server
connectDB()
  .then(() => {
    const server = app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });

    server.on("error", (err) => {
      console.error("Server failed to start:", err.message);
    });
  })
  .catch((err) => {
    console.error("MongoDB Error:", err.message);
    process.exit(1); // exit the app if DB connection fails
  });
