import User from '../models/User.js';
import generateToken, { setTokenCookie } from '../utils/generateToken.js';
import ApiResponse from '../utils/apiResponse.js';

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res, next) => {
  try {
    const { name, email, password, bio } = req.body;

    if (!name || !email || !password) {
      return ApiResponse.error(res, 400, 'Please provide all required fields');
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return ApiResponse.error(res, 400, 'User already exists');
    }

    const user = await User.create({
      name,
      email,
      password,
      bio: bio || '',
    });

    if (user) {
      const token = generateToken(user._id);
      
      // Set token as HttpOnly cookie
      setTokenCookie(res, token);

      return ApiResponse.success(res, 201, 'User registered successfully', {
        _id: user._id,
        name: user.name,
        email: user.email,
        bio: user.bio,
        avatar: user.avatar,
        // Don't send token in response body anymore
      });
    } else {
      return ApiResponse.error(res, 400, 'Invalid user data');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return ApiResponse.error(res, 400, 'Please provide email and password');
    }

    const user = await User.findOne({ email }).select('+password');

    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user._id);
      
      // Set token as HttpOnly cookie
      setTokenCookie(res, token);

      return ApiResponse.success(res, 200, 'Login successful', {
        _id: user._id,
        name: user.name,
        email: user.email,
        bio: user.bio,
        avatar: user.avatar,
        // Don't send token in response body anymore
      });
    } else {
      return ApiResponse.error(res, 401, 'Invalid email or password');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    return ApiResponse.success(res, 200, 'User profile retrieved', {
      _id: user._id,
      name: user.name,
      email: user.email,
      bio: user.bio,
      avatar: user.avatar,
      createdAt: user.createdAt,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.bio = req.body.bio !== undefined ? req.body.bio : user.bio;
      user.avatar = req.body.avatar || user.avatar;

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      return ApiResponse.success(res, 200, 'Profile updated successfully', {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        bio: updatedUser.bio,
        avatar: updatedUser.avatar,
      });
    } else {
      return ApiResponse.error(res, 404, 'User not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Logout user / clear cookie
// @route   POST /api/auth/logout
// @access  Private
export const logout = async (req, res, next) => {
  try {
    res.cookie('token', '', {
      httpOnly: true,
      expires: new Date(0), // Expire immediately
    });

    return ApiResponse.success(res, 200, 'Logged out successfully', null);
  } catch (error) {
    next(error);
  }
};