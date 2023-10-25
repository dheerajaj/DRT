// Backend/routes/user-routes.js
const express = require("express");
const {
    register,
    login,
    verifyToken,
    getUser,
    refreshToken,
    logout,
    updateProfile,
} = require("../controllers/user-controllers");
const { getReports,
    Report } = require("../controllers/report-controllers");

// // Import the new controller
// const {
//     createMensFashionProduct,
//     getMensFashionProducts,
    
// } = require("../controllers/mensFashionProduct-controllers");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/getUser", getUser)
router.get("/user", verifyToken, getUser);
router.put("/updateUser",updateProfile)
router.get("/refresh", refreshToken, verifyToken, getUser);
router.post("/logout", verifyToken, logout);

// Add routes for Reports

router.post("/reportsubmission",Report);
router.get("/getreports", getReports);

module.exports = router;

 