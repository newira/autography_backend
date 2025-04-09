// models
import userModel from "../../models/user/user.model.js";

// utils
import sendResponse from "../../utils/sendResponse.utils.js";
import hashPassword from "../../utils/hashPassword.utils.js";
import sendEmail from "../../utils/mailSender.utils.js";

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

    const result = await sendEmail({
      to: "just.pushkardeep@gmail.com",
      subject: "this i node mailer",
      text: "kaise ho bhai",
    });

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

const sign_in_with_gmail_password = (req, res) => {
  try {
  } catch (error) {
    sendResponse(res, 500, false, error.message || "Internal Server Error!");
  }
};

export { register_with_mail_password, sign_in_with_gmail_password };
