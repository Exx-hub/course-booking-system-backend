// this is a user route
const express = require("express");

const router = express.Router();

const {verifyToken} = require("../middlewares/verifyToken")

// import controller export
const userController = require("../controllers/userController");

// console.log(userController);
// export object from module.exports of specific path / file

// ---Primary user routes---
// root route: /api/users

// ***Create a new user*****

router.post("/register", userController.register);

// ***Check if username already exists***
router.post("/email-exists", userController.checkEmail);
// router.post("/email-exists", (req, res) => {
// 	console.log(req.body);
// });

// check if user is already registered
router.post("/login", userController.login);

// // Retrieve specific user by Id
router.get("/details",verifyToken, userController.getUserDetails);

// ENROLL logged in user to a course
router.post("/enroll", userController.enrollCourse);

module.exports = router; // export to get access outside of this module when imported
