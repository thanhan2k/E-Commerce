const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../middlewares/jwt");
const { response } = require("express");
const jwt = require("jsonwebtoken");

const register = asyncHandler(async (req, res) => {
  const { email, password, fisrtName, lastName } = req.body;
  if (!email || !password || !fisrtName || !lastName)
    return res.status(400).json({
      success: false,
      mes: "Missing inputs",
    });

  const user = await User.findOne({ email });
  if (user) throw new Error("Người dùng đã tồn tại!");
  else {
    const newUser = await User.create(req.body);
    return res.status(200).json({
      success: newUser ? true : false,
      mes: newUser ? "Đăng kí thành công!" : "Đăng kí không thành công!",
    });
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({
      success: false,
      mes: "Missing inputs",
    });

  const response = await User.findOne({ email });
  if (response && (await response.isCorrectPassword(password))) {
    // tách password và role ra khỏi response
    const { password, role, ...userData } = response.toObject();
    //tạo acess token => xác thực người dùng, phân quyền người dùng
    const accessToken = generateAccessToken(response._id, role);
    // tạo refresh token => cấp mới access token
    const refreshToken = generateRefreshToken(response._id);
    //lưu refresh token vào DB
    await User.findByIdAndUpdate(response._id, { refreshToken }, { new: true });
    // Lưu refresh token vào cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 3600 * 1000, // số milisecond của 7 ngày
    });
    return res.status(200).json({
      success: true,
      accessToken,
      userData,
    });
  } else {
    throw new Error(
      "Đăng nhập không thành công. Email hoặc mật khẩu không đúng!"
    );
  }
});

const getCurrent = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id).select("-refreshToken -password -role");
  return res.status(200).json({
    success: false,
    rs: user ? user : "Không tìm thấy người dùng!",
  });
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  //Lấy token từ cookies
  const cookie = req.cookies;
  //Check xem có token hay không
  if (!cookie && !cookie.refreshToken)
    throw new Error("Không tồn tại refresh token trong cookies");
  // Check token có hợp lệ hay không (còn hạn sd)
  const rs = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET);
  const response = await User.findOne({
    _id: rs._id,
    refreshToken: cookie.refreshToken,
  });
  return res.status(200).json({
    success: response ? true : false,
    newAccessToken: response
      ? generateAccessToken(response._id, response.role)
      : "Refresh token not matched",
  });
});

const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie || !cookie.refreshToken)
    throw new Error("No refresh token in cookies");
  //Xóa refresh token ở DB
  await User.findOneAndUpdate(
    { refreshToken: cookie.refreshToken },
    { refreshToken: "" },
    { new: true }
  );
  // Xóa refresh token ở cookies
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  return res.status(200).json({
    success: true,
    mes: 'logout is done'
  })
});

module.exports = {
  register,
  login,
  getCurrent,
  refreshAccessToken,
  logout
};
