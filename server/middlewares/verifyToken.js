const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const verifyAccessToken = asyncHandler(async (req, res, next) => {
  // token khi gửi từ client lên server sẽ có dang header: {authorization: Bearer token}
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err)
        return res.status(401).json({
          success: false,
          mes: "AccessToken không hợp lệ!",
        });
      req.user = decode;
      next();
    });
  } else {
    return res.status(401).json({
        success: false,
        mes: "Yêu cầu xác thực!",
      });
  }
});

const isAdmin = asyncHandler((req, res, next) => {
  const { role } = req.user
  if (role !== 'admin')
      return res.status(401).json({
          success: false,
          mes: 'REQUIRE ADMIN ROLE'
      })
  next()
})

module.exports = {
  verifyAccessToken,
  isAdmin
};
