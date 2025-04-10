import express from "express";
const app = express();

import session from "express-session";

// user router
import userRouter from "./routes/user/user.route.js";

// parsing middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, sameSite: "strict", httpOnly: true },
  })
);

// user proxy
app.use("/user", userRouter);

// testing route
app.get("/", (req, res) => {
  res.send("i am alive");
});

export default app;
