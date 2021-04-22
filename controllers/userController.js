const User = require("../models/User");

const bcrypt = require("bcrypt"); // used to encrpyt data like passwords

// CREATE A USER

const register = (req, res) => {
	let { firstName, lastName, password, emailAddress, mobileNumber } = req.body;

	password = bcrypt.hashSync(password, 10);

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

// CHECK IF USER / EMAIL ALREADY EXISTS
const checkEmail = (req, res) => {
	const emailObj = { emailAddress: req.body.emailAddress };

	User.find(emailObj, (err, foundArray) => {
		if (foundArray.length > 0) {
			res.json({
				message: "Email already exists",
				data: true,
			});
		} else {
			res.json({
				message: "Your email is available.",
				data: false,
			});
		}
	});
};

// check if user is already registered
const login = (req, res) => {
	// console.log(req.body);

	const email = req.body.emailAddress;
	const password = req.body.password;

	User.findOne({ emailAddress: email }, (err, foundUser) => {
		if (!foundUser) {
			// user not registered
			res.send({
				message: "Username not registered.",
				data: false,
			});
		} else {
			// check password of found user if same as password in body
			// use bcrypt.compareSync(plaintext password, hashed password)
			const passwordMatch = bcrypt.compareSync(password, foundUser.password);
			// returns true or false

			if (passwordMatch) {
				// email registered and correct password
				res.send({
					message: "Correct login credentials",
					data: true,
				});
			} else {
				// email registered but incorrect password
				res.send({
					message: "Incorrect password.",
					data: false,
				});
			}
		}
	});
};

// Retrieve all users

// Retrieve specific user by Id

// Update user details

// Delete an existing user

module.exports = {
	register,
	checkEmail,
	login,
};
