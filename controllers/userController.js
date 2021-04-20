const User = require("../models/User");

const bcrypt = require("bcrypt"); // used to encrpyt data like passwords

// CREATE A USER

const register = (req, res) => {
	const {
		firstName,
		lastName,
		password,
		emailAddress,
		mobileNumber,
	} = req.body;

	let newUser = new User({
		firstName,
		lastName,
		password,
		emailAddress,
		mobileNumber,
	});

	newUser.save((err, savedUser) => {
		if (err) return console.error(err);

		if (!savedUser) {
			res.send("Save unsuccessful!");
		}

		res.json({
			message: "Saved successfully",
			data: savedUser,
		});
	});
};

// Retrieve all users

// Retrieve specific user by Id

// Update user details

// Delete an existing user

module.exports = {
	register,
};
