const router = require("express").Router();
const ctrls = require("../controllers/user");
const { verifyAccessToken } = require("../middlewares/verifyToken");

router.post("/register", ctrls.register);
router.post("/login", ctrls.login);
router.get("/current", verifyAccessToken, ctrls.getCurrent);
router.post("/refreshtoken", ctrls.refreshAccessToken);
router.get("/logout", ctrls.logout);
router.get("/forgot-password", ctrls.forgotPassword);
router.put("/reset-password", ctrls.resetPassword);

module.exports = router;

// CRUD | create - read - update - delete | POST - GET - PUT - DALETE
// POST OR PUT => body
//GET OR DELETE => query
