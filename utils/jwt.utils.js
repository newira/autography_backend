import jwt from "jsonwebtoken";

const generateToken = (payload, expiresIn = "10m") => {
  if (!process.env.JWT_SECRET) {
    console.log("JWT_SECRET is null or undefined");
    return null;
  }

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn,
  });

  return token;
};

const verifyToken = (token) => {
  if (!process.env.JWT_SECRET) {
    console.log("JWT_SECRET is null or undefined");
    return { success: false, message: "Token decoading failed!" };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { success: true, decoded };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

export { generateToken, verifyToken };
