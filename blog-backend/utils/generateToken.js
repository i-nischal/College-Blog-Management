import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });
};

// function to set token as cookie
export const setTokenCookie = (res, token) => {
  const expiresIn = process.env.JWT_EXPIRE || "7d";
  const days = parseInt(expiresIn.replace('d', ''));
  
  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: days * 24 * 60 * 60 * 1000,
    path: "/",
  });
};

export default generateToken;