// models
import userModel from "../../models/user/user.model.js";

// utils
import sendResponse from "../../utils/sendResponse.utils.js";
import hashPassword from "../../utils/hashPassword.utils.js";
import sendEmail from "../../utils/mailSender.utils.js";
import { generateToken, verifyToken } from "../../utils/jwt.utils.js";

// ----------------------------------------------------------------------------------------
// Register with email and password
// ----------------------------------------------------------------------------------------

const register_with_mail_password = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //   Validate required fields
    if (!username || !email || !password) {
      return sendResponse(res, 400, false, "All fields are required!");
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return sendResponse(res, 400, false, "Email already registered!");
    }

    // hash password
    const passwordHash = await hashPassword(password);

    // Create new user
    const newUser = await userModel.create({
      username,
      email,
      passwordHash,
    });

    if (!newUser) {
      return sendResponse(res, 400, false, "User creation error!");
    }

    req.session.tempSession = { id: newUser._id, email: newUser.email };
    req.session.cookie.maxAge = 10 * 60 * 1000; // 10 mins

    const result = generateToken({ email: newUser.email });

    if (result.success) {
      const encodedToken = encodeURIComponent(result.token);

      const link = `http://localhost:3000/user/verify_email?token=${encodedToken}`;

      await sendEmail({
        to: newUser.email,
        subject: "Email verification for verified account on Autography",
        text: "Please click the link to verify your email:",
        html: `<a href="${link}">${link}</a>`,
      });
    }

    // Send success response
    return sendResponse(res, 200, true, "User registered successfully!", {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
    });
  } catch (error) {
    return sendResponse(
      res,
      500,
      false,
      error.message || "Internal Server Error!"
    );
  }
};

// ----------------------------------------------------------------------------------------
// Log in with email and password
// ----------------------------------------------------------------------------------------

const sign_in_with_gmail_password = (req, res) => {
  try {
  } catch (error) {
    sendResponse(res, 500, false, error.message || "Internal Server Error!");
  }
};

// ----------------------------------------------------------------------------------------
// Session base email verification
// ----------------------------------------------------------------------------------------

const verify_email = async (req, res) => {
  try {
    const { token } = req.query;

    // Check if token exists
    if (!token) {
      return res.status(400).send("Verification token is missing!");
    }

    // Verify the token
    const result = verifyToken(token);

    if (!result.success) {
      return res.status(400).send("Invalid or expired token!");
    }

    const userData = result.decoded;

    // Check if the old session still exists
    if (!req.session || !req.session.tempSession) {
      return res.status(400).send("Session expired or invalid!");
    }

    const user = await userModel.findOne({ email: userData.email });

    if (!user) {
      return res.status(400).send("User not found!");
    }

    // Compare email
    if (req.session.tempSession.email !== user.email) {
      return res.status(400).send("Credentials does not match!");
    }

    // Regenerate session
    req.session.regenerate(async (err) => {
      if (err) {
        return res.status(500).send("Failed to generate session.");
      }

      // Set new permanent session
      req.session.user = {
        id: userData.id,
        email: userData.email,
      };

      user.isEmailVerified = true;
      await user.save();

      return res.status(200).send("Email successfully verified!");
    });
  } catch (error) {
    return res.status(500).send(error.message || "Internal server error!");
  }
};

export {
  register_with_mail_password,
  sign_in_with_gmail_password,
  verify_email,
};
