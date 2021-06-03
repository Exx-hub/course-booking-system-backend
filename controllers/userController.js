const User = require("../models/User");
const Course = require("../models/Course");

const bcrypt = require("bcrypt"); // used to encrpyt data like passwords

const {createAccessToken} = require("../middlewares/token");

/*
*
*
CHANGE FUNCTIONS TO ASYNC / AWAIT from callbacks
*
*/

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

	User.findOne({ emailAddress: email }, "password", (err, foundUser) => {
		if (!foundUser) {
			// user not registered
			res.send({message: "Username not registered."});
		} else {
			// check password of found user if same as password in body
			// use bcrypt.compareSync(plaintext password, hashed password)
			const passwordMatch = bcrypt.compareSync(password, foundUser.password);
			// returns true or false

			if (passwordMatch) {
				// if correct password
				let updatedUser = foundUser.toObject();
				delete updatedUser.password;
				// remove password from response, for security purposes.
				// only id is needed anyway. so return id only in response

				

				// email registered and correct password
				res.send({
					message: "Succesful login!",
					token: createAccessToken(updatedUser._id)  
					// returns id of user to be used in client fetch request hidden in a jwt
				});
			} else {
				// email registered but incorrect password
				res.send({message: "Incorrect password."})
			}
		}
	});
};

// Retrieve specific user by Id
const getUserDetails = (req, res) => {
	// console.log(req.query);
	User.findById(req.query.id, "-password", (err, foundUser) => {
		// again remove password before sending response for security purposes
		// remove password using projectin in findbyid
		res.send({ userDetails: foundUser });
	});
};

const enrollCourse = (req, res) => {
	const { userId, courseName } = req.body;

	User.findById(userId, (err, foundUser) => {
		if (err) return console.error(err);
		foundUser.enrollments.push({ courseName });

		foundUser.save((err, savedUser) => {
			if (err) return console.error(err);

			Course.findOne({ name: courseName }, (err, foundCourse) => {
				if (err) return console.error(err);
				foundCourse.enrollees.push({
					userId: userId,
					lastName: savedUser.lastName,
				});

				foundCourse.save((err, savedCourse) => {
					if (err) return console.error(err);

					res.send(savedCourse);
				});
			});
		});
	});
};

module.exports = {
	register,
	checkEmail,
	login,
	getUserDetails,
	enrollCourse,
};

// client send coursename and userId of user logged in, server finds user with that
// userId, adds the coursename to the enrollments array of that user. if successful
// server then finds course with that courseName, and add that userId to that course's
// enrollees array.
