import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });
};

// New function to set token as cookie
export const setTokenCookie = (res, token) => {
  const expiresIn = process.env.JWT_EXPIRE || "7d";
  const days = parseInt(expiresIn.replace('d', ''));
  
  res.cookie("token", token, {
    httpOnly: true, // Cannot be accessed by JavaScript
    secure: process.env.NODE_ENV === "production", // HTTPS only in production
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // CSRF protection
    maxAge: days * 24 * 60 * 60 * 1000, // Convert days to milliseconds
  });
};

export default generateToken;