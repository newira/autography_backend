// models/User.js
import mongoose from "moongose";

const socialProfilesSchema = new mongoose.Schema({
  google: {
    id: String,
    email: String,
  },
  github: {
    id: String,
    email: String,
  },
  facebook: {
    id: String,
    email: String,
  },
});

const profileSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  avatar: { type: String },
  bio: { type: String },
});

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
    },
    phone: {
      type: String,
      // required: [true, 'Phone number is required'],
      match: [/^\d{10,15}$/, "Phone number must be 10-15 digits"],
    },
    phoneVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["user", "admin", "moderator"],
      default: "user",
    },
    passwordHash: {
      type: String,
      required: [true, "Password hash is required"],
    },
    accountLocked: {
      type: Boolean,
      default: false,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    lastLogin: {
      type: Date,
    },
  },
  {
    timestamps: true, // add createdAt and updatedAt
  }
);

// index email & username for fast querying
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });

export default mongoose.model("User", userSchema);
