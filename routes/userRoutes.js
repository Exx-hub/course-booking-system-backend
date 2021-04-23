// this is a user route
const express = require("express");

const router = express.Router();

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
router.get("/details", userController.getUserDetails);

// Retrieve all users
// router.get("/userList", (req, res) => {
// 	res.send("This is a list of all users!");
// });

// // Update user details
// router.put("/userList/:id", (req, res) => {
// 	res.send("updating a specific user!");
// });

// // Delete an existing user
// router.delete("/userList/:id", (req, res) => {
// 	res.send("deleting this user!");
// });

// router.get("/", (req, res) => {
// 	res.send("HELLO WORLD");
// });

module.exports = router; // export to get access outside of this module when imported
