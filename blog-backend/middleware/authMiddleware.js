import jwt from "jsonwebtoken";
import User from "../models/User.js";
import ApiResponse from "../utils/apiResponse.js";

export const protect = async (req, res, next) => {
  let token;

  // Check for token in cookie (primary method)
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }
  // Fallback to Authorization header (for backward compatibility during transition)
  else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return ApiResponse.error(res, 401, "Not authorized, no token");
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from token
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return ApiResponse.error(res, 401, "User not found");
    }

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return ApiResponse.error(res, 401, "Not authorized, token failed");
  }
};

export const optionalAuth = async (req, res, next) => {
  let token;

  // Check for token in cookie
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }
  // Fallback to Authorization header
  else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
    } catch (error) {
      // Token invalid but continue anyway
      req.user = null;
    }
  }

  next();
};