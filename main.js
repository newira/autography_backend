import express from "express";
const app = express();

// user router
import userRouter from "./routes/user/user.route.js";

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// user proxy
app.use("/user", userRouter);

// testing route
app.get("/", (req, res) => {
  res.send("i am alive");
});

export default app;
